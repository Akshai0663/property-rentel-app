import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const uploadFile = async () => {
    if (!file) {
      setMsg('Select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // MUST MATCH BACKEND

    try {
      const res = await axios.post(
        'http://localhost:5000/api/upload',
        formData
      );
      setMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setMsg('Upload failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      <p>{msg}</p>
    </div>
  );
}

export default Upload;
