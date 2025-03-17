import React from 'react';
import styles from './InstructionsModal.module.css';
import Button from '../Button';

export default function InstructionsModal({ onClose }) {
  return (
    <div id="instructionsModal" className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.instructionsTitle}>Instruções do Jogo</h2>
        <div className={styles.instructionsText}>
          <h3>Como Jogar:</h3>
          <p>O objetivo é rebater a bola com sua raquete e fazer pontos quando o oponente não conseguir rebater.</p>

          <h3>Controles:</h3>
          <h4>No Computador:</h4>
          <ul>
            <li><strong>Jogador 1:</strong> Use as teclas W (cima) e S (baixo) para mover sua raquete</li>
            <li><strong>Jogador 2:</strong> Use as teclas de seta ↑ (cima) e ↓ (baixo) para mover sua raquete</li>
            <li><strong>Modo contra Máquina:</strong> Você pode usar tanto W/S quanto as setas para controlar sua raquete</li>
          </ul>

          <h4>No Celular:</h4>
          <ul>
            <li>Use os botões ▲ e ▼ na tela para mover sua raquete</li>
          </ul>

          <h3>Modos de Jogo:</h3>
          <ul>
            <li><strong>Jogar contra Máquina:</strong> Você contra o computador</li>
            <li><strong>Jogar com Amigo:</strong> Dois jogadores no mesmo dispositivo (disponível apenas em computadores)</li>
          </ul>
        </div>
        <Button 
          id="closeInstructionsBtn" 
          className={styles.closeInstructionsBtn} 
          onClick={onClose}
        >
          Fechar
        </Button>
      </div>
    </div>
  );
}