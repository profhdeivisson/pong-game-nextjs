import React from 'react';
import Image from 'next/image';
import styles from './GameMenu.module.css';
import Button from '../Button';

export default function GameMenu({
    menuRef,
    onInstructionsClick,
    onSinglePlayerClick,
    onMultiPlayerClick,
    isMobile
}) {
    return (
        <div className={styles.menu} ref={menuRef}>
            <h1 className={styles.title}>PongStar GAME</h1>
            <Image
                src="/pongLogo.svg"
                alt="Pong Logo"
                className={styles.pongLogo}
                height={200}
                width={200}
            />
            <div className={styles.buttonsContainer}>
                <Button
                    id="instructionsBtn"
                    className={styles.instructionsBtn}
                    onClick={onInstructionsClick}
                >
                    Instruções
                </Button>
                <Button
                    id="singlePlayerBtn"
                    className={styles.singlePlayerBtn}
                    onClick={onSinglePlayerClick}
                >
                    Jogar contra Máquina
                </Button>
                <Button
                    id="multiPlayerBtn"
                    className={`${styles.multiPlayerBtn} ${styles.desktopOnly}`}
                    onClick={onMultiPlayerClick}
                >
                    Jogar com Amigo
                </Button>
            </div>
            <p className={`${styles.mobileInstructions} ${styles.mobileOnly}`}>
                Use os botões abaixo para controlar sua raquete
            </p>
        </div>
    );
}