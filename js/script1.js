
class Material{

    constructor(){
    this.id = 5;
    this.arrayMateriais = [];
    this.editId = null;
    }
    
    salvar(){
       let material = this.lerDados();
      

       if(this.validaCampos(material)){
           if(this.editId == null){
            this.adicionar(material);
           } else {
               this.atualizar(this.editId, material);
           }
          
       }    
       
       //console.log(this.arrayMateriais);
       this.listaTabela();
       this.cancelar();

       //Função executada para limpar o input do file após salvar
       document.getElementById('Salvar').addEventListener('click', function () {
        document.getElementById('file').value = '';
         }());
    }

    lerDados(){
        var material = {}
        var date = new Date();
        date = date.toLocaleString();
        moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS");

         material.idMaterial = this.id;
         material.nomeMaterial = document.getElementById('material').value;
         material.descricaoMaterial = document.getElementById('descricao').value;
         material.qntdMaterial = document.getElementById('qntd').value;
         material.dataMaterial = document.getElementById('data').value;
        // document.getElementById('data').value = date;
         material.imgMaterial = document.getElementById('file').files[0];
         return material;
     }

     adicionar(material){

        this.arrayMateriais.push(material);
        this.id++;
    }


    listaTabela(){
        let tbody = document.getElementById('tbody2');
        tbody.innerText = '';
    

        for(let i = 0; i < this.arrayMateriais.length; i++){
            let tr  = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_Material = tr.insertCell();
            let td_Descricao = tr.insertCell();
            let td_Quantidade = tr.insertCell();
            let td_Img = tr.insertCell();
            let td_Data = tr.insertCell();
            let td_Acoes = tr.insertCell();

           td_Img.classList.add('material');

            td_id.innerText = this.arrayMateriais[i].idMaterial;
            td_Material.innerText = this.arrayMateriais[i].nomeMaterial;
            td_Descricao.innerText = this.arrayMateriais[i].descricaoMaterial;
            td_Quantidade.innerText = this.arrayMateriais[i].qntdMaterial;
            td_Data.innerText = this.arrayMateriais[i].dataMaterial;
            if(this.arrayMateriais[i].imgMaterial == undefined){
                td_Img.innerText = '';
            }
                else{    
            /* A imagem selecionada será carregada na celula td_Img através da função r.readAsDataURL que passa
            o parâmetro URL para a variável imgMat através da função r.onloadend*/
            let imgMat = document.createElement('img');
            let r = new FileReader();
            r.onloadend = (e) => {imgMat.src = r.result;}
            r.readAsDataURL(this.arrayMateriais[i].imgMaterial);
            td_Img.appendChild(imgMat);

            }
  
            td_id.classList.add('center');
            td_Quantidade.classList.add('center');
            td_Acoes.classList.add('center');

           let imgEdit = document.createElement('img');
           imgEdit.src = 'img/editar-arquivo.png';
            imgEdit.setAttribute("onclick","material.preparaEdicao("+ JSON.stringify(this.arrayMateriais[i])+")");
            

           let imgDelete = document.createElement('img');
           imgDelete.src = 'img/deletar.png';
           imgDelete.setAttribute("onclick","material.deletar("+ this.arrayMateriais[i].idMaterial +");")
        

           let imgComents = document.createElement('img');
           imgComents.src = 'img/comentario.png';

         // A função AppendChild(PARÂMETRO) cria um <td> <img src=''> </td>;
           td_Acoes.appendChild(imgEdit);
           td_Acoes.appendChild(imgDelete);
           td_Acoes.appendChild(imgComents);

           console.log(this.arrayMateriais);
        }
    }

    atualizar(id, material){
        for(let i = 0; i < this.arrayMateriais.length; i++){
            if(this.arrayMateriais[i].idMaterial == id){
                this.arrayMateriais[i].nomeMaterial = material.nomeMaterial;
                this.arrayMateriais[i].descricaoMaterial = material.descricaoMaterial;
                this.arrayMateriais[i].qntdMaterial = material.qntdMaterial;
                this.arrayMateriais[i].dataMaterial = material.dataMaterial;
                this.arrayMateriais[i].imgMaterial = material.imgMaterial;       
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.idMaterial;
        document.getElementById('material').value = dados.nomeMaterial;
        document.getElementById('descricao').value = dados.descricaoMaterial;
        document.getElementById('qntd').value = dados.qntdMaterial;
        document.getElementById('data').value = dados.dataMaterial;
        document.getElementById('Salvar').innerText = 'Atualizar';
        /* Converter a variável dados.imgMaterial para img novamente pois está em formato JSON*/
        var file = JSON.parse(dados.imgMaterial);
        console.log(file);
       /* document.querySelector('#files').addEventListener('change', function () {
            console.log(Array.from(this.files))
         })*/
    }
    
    cancelar(){
        document.getElementById('material').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('qntd').value = ''; 
        document.getElementById('data').value = '';
        document.getElementById('Salvar').innerText = 'Salvar';
        this.editId = null;


        
        //Função para limpar inputs de tipo file
        document.getElementById('ButtonCancelar').addEventListener('click', function (){
            document.getElementById('file').value = '';
        }, false);
    }

    deletar(id){
        let tbody = document.getElementById('tbody2');
        if(confirm('Deseja realmente deletar o produto do ID ' + id + "?")){
        for(let i = 0; i < this.arrayMateriais.length ; i++){
         if(this.arrayMateriais[i].idMaterial == id){
             this.arrayMateriais.splice(i, 1);
             tbody.deleteRow(i);
            }
        }
      }
    }
  

    /* Função de envio e carregamento de imagem "CRUA"
        abrir(){
        LEITURA DO ARQUIVO ENVIADO PELO USUÁRIO -- var file = document.getElementById('file').files[0];

        var r = new FileReader();
        r.onload = function(e) { var imagem = r.result; document.getElementById('img').src = imagem;}
        r.readAsDataURL(file);
    }*/

    validaCampos(material){
        let msg = '';
        if(material.nomeMaterial == ''){
            msg += '- Informe o nome do Material\n';
        }

        if(material.descricaoMaterial == ''){
            msg += '- Informe uma descrição para o Material\n';
        }

        if(material.qntdMaterial == ''){
            msg += '- Informe uma quantidade de Material\n';
        }

        if(material.dataMaterial == ''){
            msg += '- Informe a data de cadastro\n';
        }
 
        if(msg != ''){
            alert(msg);
            return false;
        }
        return true;
    }

}
 var material = new Material();
