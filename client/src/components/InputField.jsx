import '../styles/InputField.css';

function InputField(){
    return (
      <div>
        <form id="form-file-upload">
          <input type="file" id="input-file-upload" multiple={false} />
          <label id="label-file-upload" htmlFor="input-file-upload">
            <div>
              <p>Drag and drop your file here or</p>
              <button className="upload-button">Upload a file</button>
            </div> 
          </label>
        </form>
      </div>
    );
}

export default InputField;