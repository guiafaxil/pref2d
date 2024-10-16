<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prefeitura Municipal - Portal Interativo</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <header>
        <h1>Prefeitura Municipal de Nossa Cidade</h1>
        <nav>
            <ul>
                <li><a href="?page=protocolo">Protocolo</a></li>
                <li><a href="?page=noticias">Notícias</a></li>
                <li><a href="?page=editais">Editais</a></li>
                <li><a href="?page=educacao">Secretaria de Educação</a></li>
                <li><a href="?page=saude">Secretaria de Saúde</a></li>
                <li><a href="?page=defesa_civil">Defesa Civil</a></li>
            </ul>
        </nav>
    </header>

    <button id="gameButton">🎮 Abrir Mapa</button>

    <section id="gameArea" style="display: none;">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
    </section>

    <main>
        <?php
        $page = $_GET['page'] ?? 'home';
        include("$page.php");
        ?>
    </main>
</body>
</html>
