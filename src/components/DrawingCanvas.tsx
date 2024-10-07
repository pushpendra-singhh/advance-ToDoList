import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSave }) => {
  const canvasRef = useRef<ReactSketchCanvas>(null);

  const handleSave = (e) => {
    e.preventDefault();
    if (canvasRef.current) {
      canvasRef.current
        .exportImage('png')
        .then((data) => {
          onSave(data);
        })
        .catch((e) => {
          console.error('Error saving drawing:', e);
        });
    }
  };

  return (
    <div className="space-y-2">
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={4}
        strokeColor="black"
        width="300px"
        height="200px"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
        Save Drawing
      </button>
    </div>
  );
};

export default DrawingCanvas;