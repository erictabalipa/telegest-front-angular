function documentDefinition(element) { 
  return docDefinition = {
	  content: [
		  {
		    style:'mb_5',
		  	table:{
		  	  widths:['*','auto'],
		  	  body:[
		  	    [{border: [false, false, false, false],text: 'REGISTRO DE ORDEM DE SERVIÇO',style: 'header'},{border: [false, false, false, false],text: 'CÓDIGO DA O.S: '+element.cod, style:'os_code'}]
		  	  ]
		  	}
		  },
		  {
		    style: 'table',
		  	table: {
		  		widths: ['*', '*','*'],
		  		headerRows: 1,
		  		body: [
		  			[{border: [false, false, false, false],text: 'INFORMAÇÕES BÁSICAS', style: 'tableHeader', colSpan: 3, alignment: 'center'},{},{}],
		  			[{border: [false, false, false, false],text: 'RESPONSÁVEL: '+ element.responsible, style: 'tableHeader'},{border: [false, false, false, false],text: 'PRIORIDADE: '+ element.priority, style: 'tableHeader'}, {border: [false, false, false, false],text: 'PRAZO: ' + element.maxDate, style: 'tableHeader'}],
		  		]
		  	}
		  },
		  {
		  	table: {
		  		widths: ['*', '*'],
		  		headerRows: 1,
		  		body: [
		  			[{border: [false, false, false, false],text: 'LUMINÁRIAS', style: 'tableHeader', colSpan: 2, alignment: 'center'},{}],
		  			[{border: [false, false, false, false],text: 'CÓDIGO:', style: 'tableHeaderInfo'}, {border: [false, false, false, false],text: 'RESPONSÁVEL:', style: 'tableHeaderInfo'}],
		  			[{border: [false, false, false, false],text: 'PRIORIDADE:', style: 'tableHeaderInfo'}, {border: [false, false, false, false],text: 'PRAZO:', style: 'tableHeaderInfo'}],
		  		]
		  	}
		  },
	  ],
	  styles: {
	  	header: {
	  		fontSize: 18,
	  		bold: true,
	  		alignment: 'left',
	  	},
	  	tableHeader:{
	  	  bold:true,
	  	  margin:  [0,0,0,15]
	  	},
	  	tableHeaderInfo:{
	  	  bold:true,
	  	  margin:  [0,0,0,5]
	  	},
	  	table:{
	  	  margin:  [0,0,0,30] 
	  	},
	  	mb_1:{
	  	  margin:  [0,0,0,10]
	  	},
	  	mb_5:{
	  	  margin:  [0,0,0,50]
	  	},
	  	os_code:{
	  	  background:'#c2c2c2'
	  	}
	  }
  }
}

    