import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'


export default class ExpenseTracker extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            balance:0,
            history:[]
        }
        this.addIncome = this.addIncome.bind(this)
    }
    addIncome( reason, money )
    {
        const { balance } = this.state
        const newHistory =  { reason: reason, money: parseInt(money) }
        this.setState({
            balance: balance + parseInt(money),
            history : [...this.state.history,newHistory]
        })
    }


  render() {
    const { balance, history } = this.state;
    return (
      <div className='ExpenseTracker'>
        <h2>Expense Tracker</h2>
        <Balance history = {history} balance = {balance} />
        <History history = {history } />
        <AddTransactionForm addBalance = {this.addIncome} />
      </div>
    )
  }
}



export class Balance extends Component {
    constructor(props)
    {
        super(props);
    }
  render() {
    const { history, balance } = this.props;
    let income = 0
    let expense = 0
    history.forEach(val=>val.money>0?income+=val.money:expense+=val.money)
    return (
      <div className='Balance'>
        <h5>Your Balance Is: </h5>
        <h3>{ balance }</h3>
        <div className='BalanceContainer'>
        
            <div className='income'>
                <span className='incomeHeader'>Income</span>
                <span className='incomeValue'>{ income }</span>
            </div>
            <div className='expense'>
                <span className='expenseHeader'>Expense</span>
                <span className='expenseValue'> { expense } </span>
            </div>
        </div>
      </div>
    )
  }
}
export class History extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        const { history } =  this.props;
        const historyList = history.map(item=>
            <div key={uuid()} className={item.money>0?'SingleHistorypos':'SingleHistoryneg'}>
                <span>{item.reason}</span>
                <span>{item.money}</span>
            </div>
            )
        return (
            <div className='History'>
               <h3>History</h3>
               {historyList}
            </div>
        )
    }
  }
  export class AddTransactionForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            text:"",
            amount: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(evt)
    {
        evt.preventDefault();
        const { text, amount } = this.state;
        this.props.addBalance(text, amount)
    }
    handleChange(evt)
    {
        this.setState({ [evt.target.name]:evt.target.value })
    }
    render() {
        const { text, amount } = this.state;
      return (
        <div className='AddTransactionForm'>
            <h3>Add new transaction</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Text</label>
            <input type='text' name="text" value={text} onChange={this.handleChange}></input>
            <label>Amount</label>
            <p>(Negative - expenses, Postive - income)</p>
            <input type='number' name="amount" value={amount} onChange = {this.handleChange}></input>
            <button>Add Transaction</button>
          </form>
        </div>
      )
    }
  }
