import {React, Component} from "react";
import './calculator.css';
import Button from "./components/Button";
import Display from "./components/Display";

const initialState = {
    displayValue: '0',
    values: [0,0],
    currentIndex: 0,
    operation: '',
    resetValues: false
}

class Calculator extends Component {

    state = {...initialState};

    constructor(props) {
        super(props)
        this.addNum = this.addNum.bind(this)
        this.operador = this.operador.bind(this)
        this.allClean = this.allClean.bind(this)
    }

    addNum = n => {
        if(n === '.' && this.state.displayValue.includes('.')) {
            // prevent to add two or more '.'
            return
        }
        if(n === '.' && this.state.displayValue === '0') {
            // just an aesthetic adjust
            this.setState({displayValue: '0.'});
            return
        }
        if(this.state.displayValue.length >= 16) {
            // max length to avoid brake the component css
            return
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
            return
        }
    }

    operador = oper => {
        if(this.state.displayValue.length >= 16) {
            // max length to avoid brake the component css
            return
        }
        let values = [...this.state.values]
        const currentIndex = this.state.currentIndex
        if(currentIndex === 0){
            if(oper === '='){
                return
            }
            this.setState({currentIndex: 1, resetValues: true, operation: oper})
            return
        } else{
            let result = null;
            switch (this.state.operation) {
                case '/':
                    result = values[0] / values[1];
                    break;
                case '*':
                    result = values[0] * values[1];
                    break;
                case '-':
                    result = values[0] - values[1];
                    break;
                case '+':
                    result = values[0] + values[1]
                    break;
                default:
                    break;
            }
            if(isNaN(result)) {
                // prevent bug like 0/0 operation
                this.setState({...initialState});
                return;
            }
            if(result.toFixed(3).toString().length >= 17) {
                this.setState({displayValue: 'operation not permited, too long result'})
                return;
            }
            values[0] = parseFloat(result.toFixed(3))
            const displayValue = parseFloat(result.toFixed(3))
            this.setState({displayValue, currentIndex: 0, values, resetValues: true})
            return
        }
    }

    cleanCurrent = _ => {
        // reset only the current value on display
        if(this.state.displayValue !== '0') {
            this.setState({displayValue: '0'})
        }
    }

    allClean = _ => {
        this.setState({...initialState})
    }
    arrayNumbers = ['0','1','2','3','4','5','6','7','8','9'];
    arrayOperators = ['/','*','-','+','='];

    componentDidMount() {
        document.addEventListener('keyup', (event) => {
            if(this.arrayNumbers.includes(event.key)) {
                let numTyped = parseInt(event.key)
                this.addNum(numTyped)
            }else if(this.arrayOperators.includes(event.key)) {
                this.operador(event.key)
            }
        })
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

export default Calculator