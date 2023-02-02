import { useState } from 'react'
import './App.css'

const App = () => {
  const affine = require("./cipher/affine")
  const autoVigenere = require("./cipher/autoKeyVigenere")
  const extendVigenere = require("./cipher/extendedVigenere")
  const hill = require("./cipher/hill")
  const playfair = require("./cipher/playfair")
  const vigenere = require("./cipher/vigenere")

  const [file, setFile] = useState()
  const [binaryFile, setBinaryFile] = useState()
  const [fileContent, setFileContent] = useState()
  const [cipher, setCipher] = useState(1)
  const [choice, setChoice] = useState("encrypt")
  const [result, setResult] = useState("")

  function changeCipher(e) {
    setCipher(e.target.value)
  }

  function changeChoice(e) {
    setChoice(e.target.value)
  }

  async function uploadFile(event) {
    const uploadedFile = event.target.files[0]
    setFile(uploadedFile)

    const reader = new FileReader()
    reader.readAsText(uploadedFile, "UTF-64")
    reader.onload = function(e) {
      setFileContent(e.target.result)
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        setBinaryFile(event.target.result)
        resolve(event.target.result)
      }

      reader.onerror = (err) => {
        reject(err)
      }

      reader.readAsDataURL(event.target.files[0])
    })
  }

  function code() {
    const textArea = document.getElementById("textInput").value
    const textKey = document.getElementById("textKey").value
    const map = [{
      "value": 1,
      "function": vigenere,
    }, {
      "value": 2,
      "function": autoVigenere,
    }, {
      "value": 3,
      "function": extendVigenere,
    }, {
      "value": 4,
      "function": affine,
    }, {
      "value": 5,
      "function": playfair,
    }, {
      "value": 6,
      "function": hill,
    }]

    const method = map.filter(function (m) {
      return m.value == cipher
    })[0].function
    const res = method[choice](textArea, textKey)
    setResult(res)
  }

  return (
    <div className="home">
      <div className="header">Tugas 1 Kriptografi</div>
      <div className="page-content">
        <div className="option">
          <h2>Cipher</h2>
          <select onChange={changeCipher}>
            <option value={1}>Vigenere Standard</option>
            <option value={2}>Auto-Key Vigenere Cipher</option>
            <option value={3}>Extended Vigenere Cipher</option>
            <option value={4}>Affine Cipher</option>
            <option value={5}>Playfair Cipher</option>
            <option value={6}>Hill Cipher</option>
          </select>
        </div>
        <div className="choice" onChange={changeChoice}>
          <div className="encrypt">
            <input type="radio" value="encrypt" name="choice" defaultChecked={true} />
            <p>Encrypt</p>
          </div>
          <div className="decrypt">
            <input type="radio" value="decrypt" name="choice" />
            <p>Decrypt</p>
          </div>
        </div>
        <div className="input">
          <div className="text">
            <h2>Text</h2>
            <textarea id="textInput" rows="10" cols="80" />
          </div>
          <div className="file">
            <h2>File</h2>
            <input type="file" name="file" onChange={uploadFile} />
          </div>
          <div className="key">
            <h2>Key</h2>
            <input id="textKey" />
          </div>
        </div>
        <div className="code">
          <button onClick={() => code()}>Code</button>
        </div>
        <div className="output">
          <h2>Result</h2>
          <p>{result}</p>
          <button>Download</button>
        </div>
      </div>
    </div>
  );
}

export default App;
