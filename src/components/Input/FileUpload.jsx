import React from "react";
import { FileUpload as FileUploadPR } from "primereact/fileupload";

import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";
import { asyncForEach, readerFile } from "helpers/utils";

class CustomFileUploadPR extends FileUploadPR {

  async upload() {
    const { onUploadChange } = this.props;
    const { files } = this.state;
    let data = [];
    await asyncForEach(files, async file => {
      await readerFile(file).then(v => {
        if (this.props.multiple || files.length === 1) {
          data.push(v);
        }
      });
    });
    onUploadChange(data);
  }
  async remove(index) {
    this.clearInputElement();

    const currentFiles = this.state.files.filter((v, i) => {
      if (i !== index) return v;
    });

    this.setState({
      files: currentFiles
    }, this.upload);
    
    this.props.setDisabled(false);
  }
}

export class FileUpload extends React.Component {
  state = {
    disabled: false
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = React.createRef();
  }

  onChange(data) {
    const {
      input: { onChange }
    } = this.props;
    if (data) {
      onChange(data);
    }
  }

  setDisabled = (value) => {
    this.setState({disabled: value})
  }

  onSelect = (e, files) => {
    if (this.fileUpload.current.props) {
      this.setDisabled(true);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetarFile && !prevProps.resetarFile) {
      this.fileUpload.current.clear();
      this.props.setResetarFileFalse();
    }
  }

  render() {
    const {
      input: { value, ...inputProps },
      className,
      id,
      accept,
      disabled,
      esconderAsterisco,
      helpText,
      label,
      labelClassName,
      meta,
      name,
      placeholder,
      required,
      multiple
    } = this.props;
    return (
      <div className="input">
        {label && [
          required && !esconderAsterisco && (
            <span key={1} className="required-asterisk">
              *
            </span>
          ),
          <label
            key={2}
            htmlFor={name}
            className={`col-form-label ${labelClassName}`}
          >
            {label}
          </label>
        ]}

        <CustomFileUploadPR
          ref={this.fileUpload}
          disabled={this.state.disabled}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          className={`${className} 
             ${meta.touched && meta.error && "invalid-field"}`}
          {...inputProps}
          accept={accept}
          auto={true}
          multiple={multiple}
          maxFileSize={10485760}
          invalidFileSizeMessageSummary={"Erro ao dar upload:"}
          invalidFileSizeMessageDetail={"O tamanho máximo de um arquivo é 10MB"}
          chooseLabel="Selecione os arquivos"
          cancelLabel="Cancelar"
          onUploadChange={this.onChange}
          onSelect={this.onSelect}
          setDisabled={this.setDisabled}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
