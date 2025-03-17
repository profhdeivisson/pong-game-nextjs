import React from 'react';
import styles from './Button.module.css';

export default function Button({ 
  id, 
  className, 
  onClick, 
  children, 
  onTouchStart, 
  onTouchEnd, 
  onMouseDown, 
  onMouseUp,
  disabled
}) {
  return (
    <button
      id={id}
      className={className ? `${styles.button} ${className}` : styles.button}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      disabled={disabled}
    >
      {children}
    </button>
  );
}