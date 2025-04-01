
import styles from '../styles/ConfirmModal.module.scss'

interface ConfirmModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  message: string,
  confirmLabel?: string,
  cancelLabel?: string
}

 function ConfirmModal({isOpen, onConfirm, onCancel, message, confirmLabel, cancelLabel}:ConfirmModalProps) {

  if(!isOpen){
    return <>not open</>
  }
  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-container']}>
        <h3>{message}</h3>
        <p>This action cannot be undone...</p>
        <div className="button-container">
          <button className='button-primary' onClick={()=>onConfirm()}>{confirmLabel ?? 'Ok'}</button>
          <button className='button-primary' onClick={()=>onCancel()}>{cancelLabel ?? 'Cancel'}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal