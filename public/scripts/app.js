if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg)
            })
    })
}

var request

if (('indexedDB' in window)) {

    request = indexedDB.open('banco', 2)

    request.onupgradeneeded = event => {

        var db = event.target.result

        db.createObjectStore('despesas', { autoIncrement: true  })
        db.createObjectStore('caixa', { autoIncrement: true })
    }

    request.onsuccess = event => {

        var db = event.target.result

        var despesas = db.transaction(['despesas'], 'readwrite').objectStore('despesas')

        despesas.getAll().onsuccess = evt => {
            evt.target.result.forEach(despesa => {

                var tr, th, valor, descricao

                tr = document.createElement('TR')
                th = document.createElement('TH')
                valor = document.createElement('TD')
                descricao = document.createElement('TD')
            
                th.innerText = document.getElementById('tabelaDespesa').children.length + 1
                descricao.innerText = despesa.descricao
                valor.innerText = despesa.valor

                tr.appendChild(th)
                tr.appendChild(descricao)
                tr.appendChild(valor)


                document.getElementById('tabelaDespesa').appendChild(tr)

            })
        }

        var caixa = db.transaction(['caixa'], 'readwrite').objectStore('caixa')

        caixa.getAll().onsuccess = evt => {
            evt.target.result.forEach(entradaCaixa => {

                var tr, th, valor, descricao

                tr = document.createElement('TR')
                th = document.createElement('TH')
                valor = document.createElement('TD')
                descricao = document.createElement('TD')
                

                th.innerText = document.getElementById('tabelaDespesa').children.length + 1
                descricao.innerText = entradaCaixa.descricao
                valor.innerText = entradaCaixa.valor

                tr.appendChild(th)
                tr.appendChild(descricao)
                tr.appendChild(valor)


                document.getElementById('tabelaCaixa').appendChild(tr)
            })
        }

    }


} else {
    console.log('Navegador não suporta indexeddb')
}


function addDespesa() {

    var db = request.result

    var transaction = db.transaction(['despesas'], 'readwrite')


    var objectStore = transaction.objectStore('despesas')

    var inserir = objectStore.add({
        descricao: document.getElementById('inputDespesaDescricao').value,
        valor: parseInt(document.getElementById('inputDespesaValor').value), 
    })

    inserir.onsuccess = event => {


        var tr, th, valor, descricao
        tr = document.createElement('TR')
        th = document.createElement('TH')
        valor = document.createElement('TD')
        descricao = document.createElement('TD')
       
        
        th.innerText = document.getElementById('tabelaDespesa').children.length + 1
        descricao.innerText = document.getElementById('inputDespesaDescricao').value
        valor.innerText = document.getElementById('inputDespesaValor').value

        tr.appendChild(th)
        tr.appendChild(descricao)
        tr.appendChild(valor)

        document.getElementById('tabelaDespesa').appendChild(tr)

        document.getElementById('inputDespesaDescricao').value = ''
        document.getElementById('inputDespesaValor').value = ''

    }

}

function addCaixa() {

    var db = request.result

    var transaction = db.transaction(['caixa'], 'readwrite')

    var objectStore = transaction.objectStore('caixa')

    var inserir = objectStore.add({
        descricao: document.getElementById('inputCaixaDescricao').value,
        valor: parseInt(document.getElementById('inputCaixaValor').value),
    })

    inserir.onsuccess = event => {

        var tr, th, valor, descricao

        tr = document.createElement('TR')
        th = document.createElement('TH')
        valor = document.createElement('TD')
        descricao = document.createElement('TD')
       

        th.innerText = document.getElementById('tabelaCaixa').children.length + 1
        descricao.innerText = document.getElementById('inputCaixaDescricao').value
        valor.innerText = document.getElementById('inputCaixaValor').value

        tr.appendChild(th)
        tr.appendChild(descricao)
        tr.appendChild(valor)

        document.getElementById('tabelaCaixa').appendChild(tr)

        document.getElementById('inputCaixaDescricao').value = ''
        document.getElementById('inputCaixaValor').value = ''

    }

}


document.getElementById('addGasto').addEventListener('click', addDespesa)
document.getElementById('addCaixa').addEventListener('click', addCaixa)