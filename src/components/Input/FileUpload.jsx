import React from "react";
import { FileUpload as FileUploadPR } from "primereact/fileupload";

import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";
import { asyncForEach, readerFile } from "helpers/utils";
import { toastError, toastInfo } from "components/Toast/dialogs";

class CustomFileUploadPR extends FileUploadPR {
  async upload() {
    const { onUploadChange } = this.props;
    const { files } = this.state;
    if (
      this.props.acceptCustom &&
      !this.props.acceptCustom.includes(files[0].type)
    ) {
      toastError("Formato de arquivo inválido");
      this.setState({ files: [] });
    } else {
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
  }
  async remove(index) {
    this.clearInputElement();
    const currentFiles = this.state.files.filter((v, i) => i !== index);
    this.setState(
      {
        files: currentFiles
      },
      this.upload
    );
  }
}

export class FileUpload extends React.Component {
  state = {
    disabled: false
  };

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
      acceptCustom,
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
        <div style={{display: 'flex'}}>
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
        </div>

        <CustomFileUploadPR
          ref={this.fileUpload}
          disabled={this.props.disabled || this.state.disabled}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          className={`${className} 
             ${meta.touched && meta.error && "invalid-field"}`}
          {...inputProps}
          accept={accept}
          acceptCustom={acceptCustom}
          auto={true}
          multiple={multiple}
          maxFileSize={5242880}
          invalidFileSizeMessageSummary={"Erro ao dar upload:"}
          invalidFileSizeMessageDetail={"O tamanho máximo de um arquivo é 5MB"}
          chooseLabel="Selecione o arquivo"
          cancelLabel="Cancelar"
          onUploadChange={this.onChange}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
