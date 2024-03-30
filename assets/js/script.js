$(function() {

    $('#btnBuscar').on('click', function(evento){
        evento.preventDefault();
        let idSuperHero = $('#supeName').val();
        $.ajax({
            type: 'GET',
            url: 'https://www.superheroapi.com/api.php/4905856019427443/'+idSuperHero,
            contentType: 'application/json',
            dataType:'json',
            success: (data)=>{
                renderData(data);
            },
            error:(error)=>{
                failData(error)
            }
        })
    })

    const renderData = (data)=>{
        if(!data){
            alert('Ingrese un id válido');
            return;
        }
        $('#pfp').attr('src', data.image.url)
        $('#nombre').text(data.name)
        $('#conexiones').text(`Conexiones: ${data.connections['relatives']}`)
        $('#ocupacion').text(`Ocupación: ${data.work.occupation}`)
        $('#editorial').text(`Publicado por: ${data.biography.publisher}`)
        $('#aparicion').text(`Primera aparición: ${data.biography['first-appearance']}`)
        $('#altura').text(`Altura: ${data.appearance.height}`)
        $('#peso').text(`Peso: ${data.appearance.weight}`)
        $('#alianzas').text(`Alianzas: ${data.connections['group-affiliation']}`)
    }










})