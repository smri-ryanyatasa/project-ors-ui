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
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { UserBulkUploadPreviewTable } from './user-bulk-upload-preview-dialog';

export function UserBulkUploadDialog({ open, onClose, onImport, onDownloadTemplate }) {
  const inputRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readingFile, setReadingFile] = useState(false);
  const [uploadExpanded, setUploadExpanded] = useState(true);
  const [error, setError] = useState('');

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const extension = selectedFile.name.split('.').pop().toLowerCase();

    if (!['xlsx', 'xls', 'csv'].includes(extension)) {
      setError('Please select a valid Excel (.xlsx, .xls) or CSV (.csv) file.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    validateAndSetFile(selectedFile);

    try {
      setReadingFile(true);
      await delay(2000);

      const data = await readFile(selectedFile);

      setRows(data);
    } catch (err) {
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

      await onImport(rows);

      handleClose();
    } catch (error) {
      const apiError = error.response?.data;
      console.log(apiError.message);
      if (Array.isArray(apiError?.errors)) {
        const errorsByRow = apiError.errors.reduce((acc, item) => {
          const rowNumber = item.row + 1;

          if (!acc[rowNumber]) {
            acc[rowNumber] = [];
          }

          acc[rowNumber].push(`${item.field}: ${item.message}`);

          return acc;
        }, {});

        const errorMessage = Object.entries(errorsByRow)
          .map(([row, errors]) => {
            return `Row ${row}:\n- ${errors.join('\n- ')}`;
          })
          .join('\n\n');

        setError(errorMessage);
      } else if (Array.isArray(apiError?.usernames)) {
        const usernames = apiError.usernames.map((item) => item.user_name).join(', ');
        console.log(usernames);
        setError(`${apiError.message || 'Username already exists'}: ${usernames}`);
      } else {
        setError(apiError?.message || 'Failed to import file.');
      }
    } finally {
      setLoading(false);
    }
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
      <DialogTitle>Bulk Upload Users</DialogTitle>

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
            {readingFile ? 'Reading file, please wait...' : 'Uploading users, please wait...'}
          </Typography>
        </Backdrop>

        <Stack spacing={3} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Upload an Excel (.xlsx) or CSV (.csv) file to import multiple users.
          </Typography>

          {error && (
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
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            startIcon={
              <SvgColor
                src="/assets/icons/solar/solar--download-bold.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
            onClick={onDownloadTemplate}
          >
            Download Template
          </Button>

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
              <Typography variant="subtitle2">Upload Excel File</Typography>
            </AccordionSummary>

            <AccordionDetails>
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
                <SvgColor
                  src="/assets/icons/solar/solar--upload-minimalistic-bold-duotone.svg"
                  sx={{
                    width: 48,
                    height: 48,
                    color: file ? 'primary.main' : 'text.secondary',
                    mb: 1,
                  }}
                />

                <Typography variant="subtitle1">
                  {file ? file.name : 'Drag & Drop Excel File'}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                  or
                </Typography>

                <Button variant="outlined" onClick={handleBrowse}>
                  Choose File
                </Button>

                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                  Supported formats: .xlsx, .xls, .csv
                </Typography>

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
              <Typography variant="body2">{file.name}</Typography>

              <IconButton color="error" onClick={handleRemoveFile}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Stack>
          )}
          {rows.length > 0 && <UserBulkUploadPreviewTable rows={rows} />}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!file || loading || error}
          sx={{
            bgcolor: '#0030ff',
            '&:hover': {
              bgcolor: '#032ad8',
            },
          }}
        >
          {loading ? 'Importing...' : 'Import'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
