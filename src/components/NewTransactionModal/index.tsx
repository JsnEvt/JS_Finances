import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { api } from '../../services/api';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void

}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const [type, setType] = useState('deposit')

  //Salvando o conteudo digitado nos campos
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()


    createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit')

    onRequestClose()

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>

        <h2>Cadastrar transação</h2>

        <input placeholder='Título'
          value={title}
          onChange={event => setTitle(event.target.value)}

        />

        <input
          type='number'
          placeholder='Valor'
          value={amount}
          onChange={event => setAmount(Number(event.target.value))} //event sempre ira retornar uma string
        //eis o motivo do uso do Number.

        />
        {/* A lina de baixo representam os botoes */}
        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType('deposit')} //devido a funcao ser pequena, podemos usar assim:
            isActive={type === 'deposit'} //ao inves de usar className, com o styled components, conseguimos
            //adicionar a propriedade que mudara o estado do botao como a linha acima.
            activeColor='green'
          >
            <img src={incomeImg} alt="Entradas" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'

          >
            <img src={outcomeImg} alt="Saidas" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder='Categoria'
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type='submit'>Cadastrar</button>


      </Container>
    </Modal>

  )
}