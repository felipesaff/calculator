import {React, Component} from "react";
import './calculator.css';
import Button from "./components/Button";
import Display from "./components/Display";

const initialState = {
    displayValue: '0',
    values: [0,0],
    currentIndex: 0,
    operation: null,
    resetValues: false
}

export default class Calculator extends Component {

    state = {...initialState};

    constructor(props) {
        super(props)
        this.addNum = this.addNum.bind(this)
        this.operador = this.operador.bind(this)
        this.allClean = this.allClean.bind(this)
    }
    addNum = n => {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        if(n === '.' && this.state.displayValue === '0') {
            return this.setState({displayValue: '0.'})
        }
        const clearDisplay = this.state.displayValue === '0' ||
                            this.state.resetValues;
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, resetValues: false })

        if(n !== '.') {
            const i = this.state.currentIndex
            const NewValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = NewValue
            this.setState({values})
        }
    }
    operador = oper => {
        let values = [...this.state.values]
        const currentIndex = this.state.currentIndex
        if(currentIndex === 0){
            if(oper === '='){
                return
            }
            this.setState({currentIndex: 1, resetValues: true, operation: oper})
        } else{
            let result = null;
            switch (this.state.operation) {
                case '/':
                    result = parseFloat((values[0] / values[1]).toFixed(3));
                    break;
                case '*':
                    result = parseFloat((values[0] * values[1]).toFixed(3));
                    break;
                case '-':
                    result = parseFloat((values[0] - values[1]).toFixed(3));
                    break;
                case '+':
                    result = parseFloat((values[0] + values[1]).toFixed(3));
                    break;
                default:
                    break;
            }
            if(isNaN(result)) {
                this.setState({...initialState});
                return;
            }
            values[0] = result
            const valueToDisplay = result.toString()
            this.setState({displayValue: valueToDisplay, currentIndex: 0, values, resetValues: true})
        }
    }
    cleanCurrent = _ => {
        if(this.state.displayValue !== '0') {
            this.setState({displayValue: '0'})
        }
    }
    allClean = _ => {
        this.setState({...initialState})
    }
    render() {
        return (
            <>
                <h2 style={{color: '#eee', textAlign: 'center'}}>Calculator</h2>
                <div className="calculator">
                    <Display value={this.state.displayValue} />
                    <div className="botoes">
                        <Button digito="AC" click={this.allClean} />
                        <Button digito="C" click={this.cleanCurrent} />
                        <Button digito="/" click={this.operador}/>
                        <Button digito="7" click={this.addNum}/>
                        <Button digito="8" click={this.addNum}/>
                        <Button digito="9" click={this.addNum}/>
                        <Button digito="*" click={this.operador}/>
                        <Button digito="4" click={this.addNum}/>
                        <Button digito="5" click={this.addNum}/>
                        <Button digito="6" click={this.addNum}/>
                        <Button digito="-" click={this.operador}/>
                        <Button digito="1" click={this.addNum}/>
                        <Button digito="2" click={this.addNum}/>
                        <Button digito="3" click={this.addNum}/>
                        <Button digito="+" click={this.operador}/>
                        <Button digito="0" click={this.addNum}/>
                        <Button digito="." click={this.addNum}/>
                        <Button digito="=" click={this.operador}/>
                    </div>
                </div>
            </>
        )
    }
}