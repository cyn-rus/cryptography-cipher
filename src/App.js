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
  const [input, setInput] = useState("text")
  const [result, setResult] = useState("")

  function changeCipher(e) {
    setCipher(e.target.value)
  }

  function changeChoice(e) {
    setChoice(e.target.value)
  }

  function changeInput(e) {
    setInput(e.target.value)
  }

  async function uploadFile(event) {
    const uploadedFile = event.target.files[0]
    setFile(uploadedFile)

    const reader = new FileReader()
    reader.readAsText(event.target.files[0], "UTF-64")
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
    let inputText = ""
    if (input === "text") inputText = document.getElementById("textInput").value
    else {
      if (cipher === "3") inputText = binaryFile
      else inputText = fileContent
    }

    const textKey = document.getElementById("textKey").value

    if (!inputText || !textKey) {
      alert("Oops! Looks like there are some empty fields.")
      return
    }

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
    const res = method[choice](inputText, textKey)
    setResult(res)
  }
  
  function download() {
    const el = document.createElement("a")
    if (cipher === "3" && input === "file") {
      const blob = new Blob(result)
      const url = window.URL.createObjectURL([blob], {type: "application/octet-stream"})
      el.href = url
      el.download = "decrypt.txt"
      el.click()
      window.URL.revokeObjectURL(url)
    } else {
      el.setAttribute("href", "data:text/plain; charset=utf-8," + encodeURIComponent(result))
      el.setAttribute("download", "decrypt.txt")
      
      el.style.display = "none"
      document.body.appendChild(el)
      el.click()
    }

    document.body.removeChild(el)
  }

  return (
    <div className="home">
      <div className="header">Tugas 1 Kriptografi</div>
      <div className="page-content">
        <div className="option container">
          <h2>Jenis Cipher</h2>
          <select className="input-area"  onChange={changeCipher}>
            <option value={1}>Vigenere Standard</option>
            <option value={2}>Auto-Key Vigenere Cipher</option>
            <option value={3}>Extended Vigenere Cipher</option>
            <option value={4}>Affine Cipher</option>
            <option value={5}>Playfair Cipher</option>
            <option value={6}>Hill Cipher</option>
          </select>
        </div>
        <div className="choice container" onChange={changeChoice}>
          <div className="encrypt choice-container">
            <input type="radio" value="encrypt" name="choice" defaultChecked={true} />
            <p>Encrypt</p>
          </div>
          <div className="decrypt choice-container">
            <input type="radio" value="decrypt" name="choice" />
            <p>Decrypt</p>
          </div>
        </div>
        <div className="input">
          <div className="choice container choose-input" onChange={changeInput}>
            <div className="input-text choice-container">
              <input type="radio" value="text" name="choose-input" defaultChecked={true} />
              <p>Text</p>
            </div>
            <div className="input-file choice-container">
              <input type="radio" value="file" name="choose-input" />
              <p>File</p>
            </div>
          </div>
          {input === "text" &&
            <div className="text container">
              <h2>Text</h2>
              <textarea id="textInput" className="input-area" rows="10" cols="80" />
            </div>
          }
          {input === "file" &&
            <div className="file container">
              <h2>File</h2>
              <input type="file" name="file" onChange={uploadFile} />
            </div>
          }
          <div className="key">
            <h2>Key</h2>
            <input id="textKey" className="input-area text-container" />
          </div>
        </div>
        <div className="code container">
          <button className="process-btn" onClick={() => code()}>Process</button>
        </div>
        <div className="output container">
          <h2>Result</h2>
          <div className="h-10 result">
            <p className="text-container input-area h-10">{result}</p>
          </div>
          <button className="download-btn" onClick={() => download()}>Download</button>
        </div>
      </div>
    </div>
  );
}

export default App;
