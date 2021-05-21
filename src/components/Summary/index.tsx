import { Container } from "./styles"
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((accumulation, transaction) => {
    if (transaction.type === "deposit") {
      accumulation.deposits += transaction.amount
      accumulation.total += transaction.amount;
    } else {
      accumulation.withdraw += transaction.amount;
      accumulation.total -= transaction.amount;
    }

    return accumulation
  }, {
    deposits: 0,
    withdraw: 0,
    total: 0,
  })
  
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
          }).format(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas"/>
        </header>
        <strong> - 
        {new Intl.NumberFormat('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
          }).format(summary.withdraw)}
        </strong>
      </div>
      
      <div className="highlight-background">
        <header >
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', { 
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
};
