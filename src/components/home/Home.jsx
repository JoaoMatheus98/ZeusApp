import React, {Component} from 'react';
import Main from '../template/Main';
import axios from 'axios';


const baseUrl = 'http://localhost:3000/api/v1/compras'
const initialState = {
    compra: {
        marca:'',
        quantidade: 0,
        valor: 0,
        updated_at: ''},
    list: []
}

const initialTotalState = {
    total: 0
}


export default class Home extends Component {

    state = {...initialState, ...initialTotalState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            console.log(resp.data.data)
            this.setState({list: resp.data.data})
            console.log(this.state.list)
            
            let apenasPreco = compra => compra.valor
            let resultado = this.state.list.map(apenasPreco)
            this.state.total = resultado.reduce(function(total, resultado){
                return total + resultado
            })

            const total = this.state.total
            console.log(this.state.total)
            this.setState({total})
            console.log(this.state.total)
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <strong>Mês: </strong>
                    <tr>
                        <th>Marca</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(compra => {
            return(
                    <tr key={compra.id}>
                        <td>{compra.marca}</td>
                        <td>{compra.quantidade} Kg</td>
                        <td>R$ {compra.valor}</td>
                        <td>{compra.updated_at.slice(0,-14).split('-').reverse().join('/')}</td>
                    </tr>
            )
        })
    }

    renderTotal(){
        return(
            <td>Total gasto em compras: R${this.state.total}</td>
        )
    }
    
    render(){
        return(
            <Main>
                {this.renderTable()}
                {this.renderTotal()}
            </Main>
        )
    }
    }