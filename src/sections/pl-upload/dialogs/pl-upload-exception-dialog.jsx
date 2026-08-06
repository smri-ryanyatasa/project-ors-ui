import * as XLSX from 'xlsx';
import { useRef, useState } from 'react';

import {
  Box,
  Alert,
  Stack,
  Button,
  Dialog,
  Backdrop,
  Accordion,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { PlUploadPreviewTable } from './pl-upload-preview-dialog';

export function PlUploadExceptionDialog({
  open,
  pl,
  onClose,
  onImport,
  onDownloadTemplate,
  branch,
}) {
  const inputRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readingFile, setReadingFile] = useState(false);
  const [uploadExpanded, setUploadExpanded] = useState(true);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return false;

    const extension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!['xlsx', 'xls'].includes(extension ?? '')) {
      setError('Please select a valid Excel (.xlsx, .xls) file.');
      setFile(null);
      return false;
    }

    if (pl.filename != selectedFile.name) {
      setError('Mismatch file name');
      setFile(null);
      return false;
    }

    const filename = selectedFile.name.replace(/\.[^/.]+$/, '');

    // Format: maximum 6 digits_numbers only_3-4 digits
    const filenamePattern = /^\d{1,6}_\d+_\d{3,4}$/;

    if (!filenamePattern.test(filename)) {
      setError('Invalid filename. Format must be: Vendor Code_Sales Invoice_Branch Code.xlsx');
      setFile(null);
      return false;
    }

    setError('');
    setFile(selectedFile);

    return true;
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    const isFileValid = validateAndSetFile(selectedFile);

    if (!isFileValid) {
      return;
    }

    try {
      setReadingFile(true);
      await delay(2000);

      const data = await readFile(selectedFile);
      const errors = [];

      // VALIDATE TEMPLATE HEADER
      const expectedHeaders = [
        'DD No',
        'SI',
        'Ship To Code',
        'Consignee',
        'UOM',
        'Material',
        'Size No',
        'Description',
        'Served Qty',
        'Carton Qty',
        'Branch',
        'Vendor',
      ];

      const actualHeaders = Object.keys(data[0] ?? {});

      const isValidTemplate =
        actualHeaders.length === expectedHeaders.length &&
        expectedHeaders.every((header, index) => actualHeaders[index] === header);

      if (!isValidTemplate) {
        errors.push('Invalid template.');
      }

      const filenameParts = selectedFile.name.replace(/\.[^/.]+$/, '').split('_');

      // VALIDATE BRANCH CODE
      const branchCode = Number(filenameParts[2]);
      const selectedBranch = Number(branch);

      const isMatchingBranch = data.every(
        (row) => Number(row.Branch) === selectedBranch && Number(row.Branch) === branchCode
      );

      if (!isMatchingBranch) {
        errors.push('Mismatch branch code.');
      }

      // VALIDATE IF ALL BRANCH CODES IN UPLOADED FILE ARE THE SAME
      const branchCodes = data.map((row) => Number(row.Branch));
      const isSameBranch = branchCodes.every((bc) => bc === branchCodes[0]);

      if (!isSameBranch) {
        errors.push('Multiple branch codes found in file.');
      }

      // VALIDATE VENDOR CODE AGAINST FILE NAME
      const vendorCode = Number(filenameParts[0]);
      const isMatchingVendor = data.every((row) => Number(row.Vendor) === vendorCode);

      if (!isMatchingVendor) {
        errors.push('Mismatch vendor code.');
      }

      // VALIDATE IF ALL VENDOR CODES IN UPLOADED FILE ARE THE SAME
      const vendorCodes = data.map((row) => Number(row.Vendor));
      const isSameVendor = vendorCodes.every((vc) => vc === vendorCodes[0]);

      if (!isSameVendor) {
        errors.push('Multiple vendor codes found in file.');
      }

      // VALIDATE SI NUMBER AGAINST FILE NAME
      const siNumber = Number(filenameParts[1]);
      const isMatchingSI = data.every((row) => Number(row.SI) === siNumber);

      if (!isMatchingSI) {
        errors.push('Mismatch SI number.');
      }

      // VALIDATE IF ALL SI NUMBERS IN UPLOADED FILE ARE THE SAME
      const siNumbers = data.map((row) => Number(row.SI));
      const isSameSI = siNumbers.every((si) => si === siNumbers[0]);

      if (!isSameSI) {
        errors.push('Multiple SI number found in file.');
      }

      setIsValid(errors.length > 0);
      setValidationErrors(errors);
      setRows(data);
    } catch (err) {
      console.error(err);
      setError('Unable to read the selected file.');
    } finally {
      setUploadExpanded(false);
      setReadingFile(false);
    }

    event.target.value = '';
  };

  const handleDrop = async (event) => {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files?.[0];

    validateAndSetFile(selectedFile);

    try {
      setReadingFile(true);
      await delay(2000);

      const data = await readFile(selectedFile);

      setRows(data);
    } catch (err) {
      console.log(err);
      setError('Unable to read the selected file.');
    } finally {
      setUploadExpanded(false);
      setReadingFile(false);
    }

    event.target.value = '';
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    setRows([]);
    setFile(null);
    setIsValid(false);
    setValidationErrors([]);
    setUploadExpanded(true);
    setError('');
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const readFile = async (selectedFile) => {
    const buffer = await selectedFile.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: 'array',
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet, {
      defval: '',
    });

    return data;
  };

  const handleImport = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    try {
      setLoading(true);
      const data = {
        rows,
        file,
        pl,
        branch,
      };

      await onImport(data);

      handleClose();
    } catch (err) {
      const apiError = err.response?.data;

      if (Array.isArray(apiError?.errors)) {
        const errorsByRow = apiError.errors.reduce((acc, item) => {
          const rowNumber = item.row + 1;

          if (!acc[rowNumber]) {
            acc[rowNumber] = [];
          }

          acc[rowNumber].push(`${item.message}`);

          return acc;
        }, {});

        const errorMessage = Object.entries(errorsByRow)
          .map(([row, errors]) => `Row ${row}:\n- ${errors.join('\n- ')}`)
          .join('\n\n');

        setError(errorMessage);
      } else if (Array.isArray(apiError?.usernames)) {
        const usernames = apiError.usernames.map((item) => item.user_name).join(', ');

        setError(`${apiError.message || 'Username already exists'}: ${usernames}`);
      } else {
        setError(apiError?.message || 'Failed to import file.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleClose = () => {
    setFile(null);
    setRows([]);
    setUploadExpanded(true);
    setError('');
    onClose();
  };

  const isProcessing = readingFile || loading;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle>Uploading Packing List - {pl.filename}</DialogTitle>

        <Button
          variant="outlined"
          startIcon={
            <SvgColor
              src="/assets/icons/solar/solar--download-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          sx={{ mr: 3 }}
          onClick={onDownloadTemplate}
        >
          Download Template
        </Button>
      </Stack>

      <Divider />

      <DialogContent>
        <Backdrop
          open={isProcessing}
          sx={{
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.modal + 1,
            color: '#fff',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 1,
          }}
        >
          <CircularProgress color="inherit" />

          <Typography color="inherit" variant="subtitle1">
            {readingFile ? 'Reading file, please wait...' : 'Uploading pl, please wait...'}
          </Typography>
        </Backdrop>

        <Stack spacing={2} sx={{ mt: 2 }}>
          {(error || isValid) && (
            <Alert
              severity="error"
              sx={{
                alignItems: 'flex-start',
                '& .MuiAlert-message': {
                  width: '100%',
                  minWidth: 0,
                  maxHeight: 300,
                  overflowY: 'auto',
                  pr: 1,
                  whiteSpace: 'pre-line',
                },
              }}
            >
              {validationErrors.join('\n') || error}
            </Alert>
          )}

          <Accordion
            expanded={uploadExpanded}
            onChange={(_, expanded) => setUploadExpanded(expanded)}
            disableGutters
          >
            <AccordionSummary
              expandIcon={
                <SvgColor src="/assets/icons/solar/solar--alt-arrow-down-line-duotone.svg" />
              }
            >
              <Typography variant="subtitle2">Collapse / Expand</Typography>
            </AccordionSummary>

            <AccordionDetails onClick={handleBrowse}>
              <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                sx={{
                  border: '2px dashed',
                  borderColor: file ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  transition: '0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  component="img"
                  src="/assets/icons/solar/illustration-upload.svg"
                  sx={{
                    color: file ? 'primary.main' : 'text.secondary',
                  }}
                />

                <Typography variant="subtitle1">
                  {file ? file.name : 'Drop or select File'}
                </Typography>

                <Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 1 }}
                  >
                    Allowed Filetype: *xls, xlsx
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mb: 3 }}
                  >
                    Filename Format: Vendor Code_Sales Invoice_Branch Code.xlsx
                  </Typography>
                </Stack>

                <input
                  ref={inputRef}
                  hidden
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          {file && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 1.5,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src="/assets/icons/solar/excel.svg"
                  sx={{
                    width: 48,
                    height: 48,
                  }}
                />
                <Stack>
                  <Typography variant="body2">{file.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                </Stack>
              </Stack>

              <IconButton color="error" onClick={handleRemoveFile}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Stack>
          )}
          {rows.length > 0 && <PlUploadPreviewTable rows={rows} />}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!file || loading || error || isValid}
          sx={{
            bgcolor: '#0030ff',
            '&:hover': {
              bgcolor: '#032ad8',
            },
          }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
