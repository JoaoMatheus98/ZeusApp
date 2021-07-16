import React, {Component} from 'react';
import Main from '../template/Main';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerProps = {
    icon: 'shopping-cart',
    title: 'Compras',
    subtitle: 'Cadastro de compras: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3000/api/v1/compras'
const initialState = {
    compra: {
        marca:'',
        quantidade: 0,
        valor: 0,
        updated_at: ''},
    list: []
}

const notify = () => toast("Wow so easy!");

export default class CompraCrud extends Component {
    
    state = {...initialState}


    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data.data})
        })
    }
    
    clear() {
        this.setState({compra: initialState.compra})
    }

    save() {
        const compra = this.state.compra
        const method = compra.id ? 'put' : 'post'
        const url = compra.id ? `${baseUrl}/${compra.id}` : baseUrl
        axios[method](url, compra)
            .then(resp => {
                const list = this.getUpdatedList(resp.data.data)
                this.setState({ compra: initialState.compra, list})
                window.alert("Compra salva")
            })
    }

    getUpdatedList(compra, add = true) {
        const list = this.state.list.filter(c => c.id !== compra.id)
        if(add) list.unshift(compra)
        console.log(list)
        return list
    }

    updateField(event){
        const compra = {...this.state.compra}
        compra[event.target.name] = event.target.value
        this.setState({compra})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Marca da ração</label>
                            <input type="text" className="form-control"
                                name="marca"
                                value={this.state.compra.marca}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome da marca..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade (Kg)</label>
                            <input type="text" className="form-control"
                                name="quantidade"
                                value={this.state.compra.quantidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a quantidade..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor (R$)</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={this.state.compra.valor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o valor..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" 
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(compra){
        this.setState({compra})
    }

    remove(compra){
        if(window.confirm("Voce tem certeza que quer deletar essa compra?"))
        {   axios.delete(`${baseUrl}/${compra.id}`).then(resp => {
                const list = this.getUpdatedList(compra, false)
                this.setState({ list })
        })}
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
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
                    <td>
                        <button className="btn btn-warning"
                            onClick={e => this.load(compra)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.remove(compra)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}