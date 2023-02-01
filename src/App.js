import { useState } from 'react'
import './App.css'

const App = () => {
  const [file, setFile] = useState()

  function uploadFile(event) {
    setFile(event.target.files[0])
    const reader = new FileReader()
    reader.onload = function(evt) {
      console.log(evt.target.result)
    }
    reader.readAsBinaryString(file)
  }

  console.log(file)

  return (
    <div>
      <input type="file" name="file" onChange={uploadFile} />
    </div>
  );
}

export default App;
