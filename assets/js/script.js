$(function () {

    $('#btnBuscar').on('click', function (evento) {
        evento.preventDefault();
        let idSuperHero = $('#supeName').val();
        if (isNaN(parseInt(idSuperHero)) || parseInt(idSuperHero) != idSuperHero || parseInt(idSuperHero) < 1 || parseInt(idSuperHero) > 732) {
            alert('Por favor, ingrese un número entero entre 1 y 732.');
            return;
        }

        $.ajax({
            type: 'GET',
            url: 'https://www.superheroapi.com/api.php/4905856019427443/' + idSuperHero,
            contentType: 'application/json',
            dataType: 'json',
            success: (data) => {
                renderData(data);
            },
            error: (error) => {
                failData(error)
            }
        })
    })

    const renderData = (data) => {
        if (!data) {
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

        const graphData = [
            { estadistica: "Inteligencia", valor: parseInt(data.powerstats.intelligence) },
            { estadistica: "Fuerza", valor: parseInt(data.powerstats.strength) },
            { estadistica: "Velocidad", valor: parseInt(data.powerstats.speed) },
            { estadistica: "Durabilidad", valor: parseInt(data.powerstats.durability) },
            { estadistica: "Poder", valor: parseInt(data.powerstats.power) },
            { estadistica: "Combate", valor: parseInt(data.powerstats.combat) }
        ];

        const chart = new CanvasJS.Chart("grafico", {
            animationEnabled: true,
            title: {
                text: "Estadísticas"
            },
            axisY: {
                title: "Valor",
                includeZero: true
            },
            data: [{
                type: "column",
                indexLabelFontSize: 10,
                indexLabel: "{y}",
                dataPoints: graphData.map(item => ({ label: item.estadistica, y: item.valor }))
            }]
        });

        chart.render();
    }
})