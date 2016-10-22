var dej;
var deptos;
d3.json("assets/divipola_depto_mun_list.json", function(json) {
    dej = json;
    deptos_list = d3.nest()
        .key(function(d) {
            return d.properties.CODIGO_DEPARTAMENTO })
        .sortKeys(d3.ascending)
        .key(function(d) {
            return d.properties.NOMBRE_MUNICIPIO })
        .sortKeys(d3.ascending)
        .rollup(function(d) {
            return [d[0].properties.CODIGO_DEPARTAMENTO, d[0].properties.NOMBRE_DEPARTAMENTO, d[0].properties.CODIGO_MUNICIPIO, d[0].properties.NOMBRE_MUNICIPIO] })
        .entries(json.features);
    	console.log(deptos_list);
    // dej = deptos_list;

    var listDeptos = d3.select("#first-choice select");
    listDeptos.selectAll("option")
        .data(deptos_list)
        .enter()
        .append("option")
        .attr("value", function(d) {
            return d.values[0].values[0]; })
        .text(function(d) {
            return d.values[0].values[1]; });
    listDeptos.on('change', function() {
    		document.getElementById('menu-mcpio').innerHTML = '';
        	var sel = this.value;
        	var mcipio = deptos_list.filter(function(d){ return d.key == sel;});
        	console.log(mcipio[0].values);
            var listMun = d3.select("#second-choice select")
            	.selectAll("option")
                .data(mcipio[0].values)
                .enter()
                .append("option")
                .attr("value", function(d) {
                    return d.values[2]; })
                .text(function(d) {
                    return d.values[3] })
        });


});
