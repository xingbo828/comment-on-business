import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: inline-block;
  > .RichEditor-root {
    z-index: 0;
    overflow: unset;
  }
`;

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { initContent: this.props.value };
  }
  receiveMarkdown = content => {
    if (content.charCodeAt(0) === 8203) {
      this.props.onChange('');
    } else {
      this.props.onChange(content.trim());
    }
  };
  render() {
    return (
      <EditorContainer>
        <LzEditor
          lang={'en'}
          importContent={this.state.initContent}
          cbReceiver={this.receiveMarkdown}
          image={false}
          video={false}
          audio={false}
          fullScreen={false}
          color={false}
          autoSave={false}
          convertFormat="markdown"
        />
      </EditorContainer>
    );
  }
}

export default RichEditor;
