import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function BulkUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // 'file' must match upload.single('file')

    try {
      const res = await axios.post('/upload-excel', formData);
      setMessage(res.data.message || 'Upload successful!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Upload failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Bulk Upload using Excel</h2>
      
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center">
            <label htmlFor="excel-input" className="block text-sm font-medium mb-2">
            Upload Excel File:
            </label>

            <label
                htmlFor="excel-input"
                className="inline-block px-4 py-2 bg-amber-600 text-white rounded-3xl cursor-pointer hover:bg-amber-500 transition"
            >
            Choose Excel File
            </label>
            <Input id="excel-input" type="file" name="file" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden"/>
            {file && (
                <p className="text-sm text-gray-600 mt-1">
                    Selected: <span className="font-medium text-black">{file.name}</span>
                </p>
            )}

            <Button type="submit">Upload</Button>
        </form>


      {message && <p className="mt-4 text-center text-lg">{message}</p>}
    </div>
  );
}

export default BulkUpload;
