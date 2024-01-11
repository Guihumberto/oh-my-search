<template>
  <div class="menuWrapper">
    <div class="menuContent">
      <div class="blocos">
        <ul role="list" class="list">
          <li><a href="">Lei de reorganização</a></li>
          <li><a href="">Estrutura</a></li>
          <li><a href="">Regimento</a></li>
          <li><a href="">Planejamento Estratégico</a></li>
        </ul>
      </div>
      <div class="blocos">
        <h2>Missão</h2>
        <p>Promover e controlar o cumprimento das obrigações tributárias com justiça e eficiência para contribuir com o desenvolvimento do Estado.</p>
      </div>
      <div class="blocos">
        <h2>Visão</h2>
        <p>Ser uma instituição de excelência reconhecida pela qualidade de seus serviços e pelo alto nível dos seus resultados</p>
      </div>
      <div class="blocos">
        <h2>Valores</h2>
        <ul class="pl-6">
          <li>Comprometimento</li>
          <li>Credibilidade</li>
          <li>Equidade</li>
          <li>Ética</li>
          <li>Transparência</li>
          <li>Cultura e Inovação</li>
          <li>Resiliência</li>
        </ul>
      </div>
    </div>
    <div class="text-center">
      <v-btn color="error" @click="$emit('menu')" variant="text">Fechar</v-btn>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.menuWrapper{
  width: 100%;
  min-height: 10vh;
  border-top: 10px solid var(--primary-color);
  border-bottom: 10px solid var(--primary-color);
  margin-top: 1rem;
  padding: 1rem 0;
  background: white;
}
.menuContent{
  width: min(100%, 1000px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.blocos{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.blocos h2, p, ul{
  width: 100%;
}
.list li{
  padding: .5rem 1rem;
  background: rgb(239, 239, 245);
  margin-bottom: .5rem;
}
.list li:hover{
  background: var(--primary-color);
  color: white;
}
.list li:hover a{
  color: white;
}
</style>
