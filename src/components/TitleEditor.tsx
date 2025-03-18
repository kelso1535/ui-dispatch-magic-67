
import React from 'react';

interface TitleEditorProps {
  dispatchTitle: string;
  setDispatchTitle: (title: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ dispatchTitle, setDispatchTitle }) => {
  return (
    <div className="px-6 py-2 bg-dispatch-darker/80 flex items-center justify-center border-b border-white/10">
      <h1 className="text-white text-xl font-semibold">{dispatchTitle}</h1>
      <button 
        onClick={() => {
          const newTitle = prompt("Enter new dispatch title:", dispatchTitle);
          if (newTitle) setDispatchTitle(newTitle);
        }}
        className="absolute right-4 text-xs bg-dispatch-muted/30 hover:bg-dispatch-muted/50 text-white/80 px-2 py-1 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default TitleEditor;
