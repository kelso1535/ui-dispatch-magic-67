
import React from 'react';

interface TitleEditorProps {
  dispatchTitle: string;
  setDispatchTitle: (title: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ dispatchTitle, setDispatchTitle }) => {
  return (
    <div className="px-6 py-2 bg-dispatch-darker/50 flex items-center">
      <button 
        onClick={() => {
          const newTitle = prompt("Enter new dispatch title:", dispatchTitle);
          if (newTitle) setDispatchTitle(newTitle);
        }}
        className="text-xs bg-dispatch-muted/30 hover:bg-dispatch-muted/50 text-white/80 px-2 py-1 rounded"
      >
        Edit Title
      </button>
    </div>
  );
};

export default TitleEditor;
