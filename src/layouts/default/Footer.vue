<template>
  <div class="footer">
      <div class="container">
        <div class="datasefaz">
          <img class="mb-2" src="https://www.transparencia.ma.gov.br/assets/images/v2/img/governo2-removebg-preview.png" alt="">
          <h3>Secretaria de Fazenda do Estado do Maranhão</h3>
          <p>CNPJ: 99999/0001-01</p>
          <p> Av. Carlos Cunha s/n Calhau <br> CEP 65076-905, São Luís - MA</p>
        </div>
        <div>
          <div class="groupbtns">
            <dialoghorario />
            <v-btn class="btn" variant="tonal"><v-icon class="mr-2">mdi-phone</v-icon>Contatos</v-btn>
            <v-btn variant="tonal"><v-icon class="mr-2">mdi-map-marker-circle</v-icon>Agências</v-btn>
          </div>
          <div class="my-5 textasdim">
            <p>O conteúdo disponível neste portal está sob responsabilidade <br> da Assessoria de Desenvolvimento Institucional da SEFAZ/MA </p>
            <p>(98)3219-9094 | (98)3217-4541 | email: asdin@sefaz.ma.gov.br</p>
          </div>
          <div class="text-center linksfinal">
            <a href="">Manuais</a> |
            <a href="">Dowloads</a> |
            <a href="">Mapa do Site</a> |
            <a href="">SEFAZ e a LGPD</a>
          </div>
        </div>
      </div>
      <div class="subfooter">
        <h3>© 2023 - COTEC | SEFAZ MA</h3>
      </div>
  </div>
</template>

<script>
  import dialoghorario from '@/components/dialogs/horarios'
  export default {
    components:{
      dialoghorario
    }
  }
</script>

<style lang="scss" scoped>
.footer{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: var(--clr-accent-100);
  width: 100%;
  background: rgb(158, 158, 165);
}
.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  min-height: 10rem;
  gap: 3rem;
  width: min(90%, 1000px);
}
.datasefaz{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.datasefaz > *{
  text-align: left;
  width: 100%;
}
.subfooter{
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(58, 58, 59);
  width: 100%;
  padding: 1rem 0;
}
.textasdim{
  font-size: .9rem;
  text-align: center;
}
.linksfinal a{
  text-decoration: none;
  padding: .5rem;
  color: #000;
  transition: .5s;
}
.linksfinal a:hover{
  text-decoration: underline;
}
.btn{
  margin: 0 1rem;
}
@media (max-width:900px) {
  .container{
    flex-direction: column;
  }
  .datasefaz > *{
    text-align: center;
  }
}
@media (max-width:500px) {
  .groupbtns{
    display: grid;
    grid-auto-columns: 1fr;
    gap: 1rem;
  }
  .btn{
    margin: 0;
  }
}
</style>
