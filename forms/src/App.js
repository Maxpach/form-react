import { useState } from 'react';
import './App.css';
import MaskedInput  from './MaskedInput';


function App() {
  
    //pega as informções do form, e separa as informações que vão receber um stage
    const [formValues, setFormValues] = useState({  filhos: 'nao', civil: 'solteiro'});

    //receber os dados de cada um individualmente
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //testes-console
        console.log("*** handleInputChange", name, value);
        setFormValues({...formValues, [name]: value });
    };

    //Coloca os valores
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        //testes-console
        console.log("*** handleSubmit", data);

        //testes-console
        console.log("**** formValues", formValues)
    };

    //habilita e dasabilita os inputs filhos
    const [disabled, setDisabled] = useState(true);
    function ativar() {
      setDisabled(!disabled);
    }

    //habilita e dasabilita os inputs conjuge 
    //porém não funciona, só posso usar o disable apenas com uma
    //e quando uso o jquery da umas respostas meio estranas
    //tentei usar o this. e manipular pelo dom, mas nada deu certo.
    const [readonly, setReadonly] = useState(disabled);
    function ativarReadonly() {
      setReadonly(!readonly);
    }
   
    return (

        <form onSubmit = {handleSubmit}>
            <img class = "logo" src = "/img/logo.png" alt = "logo-dna" ></img> 

        <h1> Formulário </h1> 

        { /*NOME*/ }
        <h4>Nome *</h4> 
        <input 
            type = "text"   
            name = "nome"
            maxLength= "50" 
            pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$" 
            placeholder = "Nome e Sobrenome*" 
            onChange = { handleInputChange } 
            required 
            values = { formValues.name || '' }
        /> 
        
        { /*CPF*/ }
        <h4>CPF *</h4>
        <MaskedInput
            type = "number" 
            name = "cpf"
            minlength="11"
            maxlength="11"  size="11"
            mask = "999.999.999-99" 
            onChange = { handleInputChange }             
            value = {formValues.cpf}
        />
    
        
        { /*DATA*/ } 
        <h4> Data de Nascimento *</h4>
        <input 
            type = "date"  
            name = "data"  
            onChange = { handleInputChange } 
            required 
            values = { formValues.data || '' }
        />
        
        { /*GENERO*/ }
        <h4>Gênero</h4>  
        <label for="genero">
            <select name="genero" id="estado"  onChange = { handleInputChange } values = { formValues.genero || '' }>
                <option name = "genero" ></option>
                <option name = "genero" >Heterossexual</option>
                <option name = "genero" >Homossexual</option>
                <option name = "genero" >Bissexual</option>
                <option name = "genero" >Assexual</option>
                <option name = "genero" >Pansexual</option>
            </select>  
        </label>
        
        { /*EST-CIVIL*/ }
        <h4>Estado Cívil *</h4>
        <div>
            <label className="espaco">
                <input
                     
                    value = "solteiro"   
                    type="checkbox"
                    name="civil" 
                    onChange = { handleInputChange } 
                    checked = { formValues.civil === 'solteiro' } />Solteiro
            </label>

            <label className="espaco">
                <input
                      
                    value = "casado"     
                    type="checkbox"
                    name="civil"  
                    onChange = { handleInputChange } 
                    checked = { formValues.civil === 'casado' }  
                    onClick={ativarReadonly} />Casado
            </label>
            <label className="espaco" >
                <input
                     
                    value = "separado"   
                    type="checkbox" 
                    name="civil" 
                    onChange = { handleInputChange } 
                    checked = { formValues.civil === 'separado' }  />Separado
            </label> 
            <label className="espaco" >    
                <input
                     
                    value = "divorciado" 
                    type="checkbox"
                    name="civil"  
                    onChange = { handleInputChange } 
                    checked = { formValues.civil === 'divorciado' }  />Divorciado
            </label>    
            <label className="espaco" >
                <input
                    
                    value = "viuvo"      
                    type="checkbox"
                    name="civil"  
                    onChange = { handleInputChange } 
                    checked = { formValues.civil === 'viuvo' }  />Viúvo
            </label>
        </div>

        { /*??EST-CIVIL??casado**/ }
        <h4>Nome do Cônjuge</h4>
        
        <label id="idconjuge">  
            <input
                onclick = {ativarReadonly}
                type = "text"              
                name = "conjuge" 
                placeholder = "Caso seja Casado" 
                onChange = { handleInputChange }
                values = { formValues.conjuge | ''}
            />
        </label>
        
        { /*?FILHOS?*/ }
        <h4> Possui filhos ? * </h4> 
        <div>
            <label className="espaco" >
                <input
                //habilita o input  
                onClick={ativar}                
                type = "checkbox" 
                value="sim"
                name = "filhos" 
                onChange = { handleInputChange } 
                checked = { formValues.filhos ==='sim' }/> Sim </label> 
            <label>
                <input
                //desabilita o input 
                onClick={ativar}  
                type = "checkbox" 
                value="nao"
                name = "filhos" 
                onChange = { handleInputChange } 
                checked = { formValues.filhos === 'nao' }/> Não </label>           
        </div>   
    
        { /*?RESPOSTA-FILHOS?*/ } 
        <div>
            <label type = "checkbox">
                <input
                id="b_4" 
                type = "number" 
                name = "filhos"
                min="1" max="30"
                disabled={disabled} 
                placeholder = "Quantos filhos possui?" 
                onChange = { handleInputChange } 
                values = { formValues.qtdfilhos | '' }/> 
            </label> 
        </div> 

        * Campo Obrigatório 
        <br/> < br/>

            <button type = "submit">Enviar</button>
        
    </form>
    
);
    
}

export default App;