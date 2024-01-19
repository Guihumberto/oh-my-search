<template>
  <header class="primary-header" id="pri-hea">
    <div class="wrappersubheader">
      <div class="subheader">
        <h6>
          <img class="img_flag" src="../../assets/flagma.png" />
          <span class="gov">GOVERNO DO MARANHÃO</span>
        </h6>
        <div class="rigthSubheader">
          <a href="" class="mr-2">Área do servidor</a>
          <v-icon @click="dark = !dark" size="small">{{ dark ? 'mdi-brightness-3' : 'mdi-brightness-4'}}</v-icon>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        <small class="text-white">Portal da</small>
        <h1 class="text-white">SEFAZ MA</h1>
      </div>
      <nav class="navbar">
        <ul role="list">
          <li> <a @click="menu = !menu">INSTITUCIONAL</a></li>
          <li> <a class="active">CIDADÃO</a></li>
          <li> <a href="">EMPRESAS</a></li>
        </ul>
      </nav>
      <div class="btn_group">
        <v-btn class="mr-2" icon="mdi-account-tie"></v-btn>
        <v-btn icon="mdi-email"></v-btn>
      </div>
    </div>
  </header>
  <menu-bar @menu="menu = !menu" class="menu" v-if="menu"  />
</template>

<script>
  import MenuBar from '@/components/dialogs/menuBar.vue'
  import { useGeneralStore } from '@/store/GeralStore'
  const generalStore = useGeneralStore()

  export default{
    data() {
        return {
            dark: false,
            menu: false
        };
    },
    methods: {
        isSearch() {
            generalStore.changeSearch();
        },
        scroll (refName) {
          const element = document.getElementById(refName)
          element.scrollIntoView({behavior: "smooth"})
          this.menu = false
        }
    },
    components: { MenuBar },
    created(){
      setTimeout(() => {
        this.isSearch()
      }, 1);
    }
}
</script>

<style>
header{
  background-image: linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%);
}
header h1{
  font-weight: 700;
  font-size: 2rem;
}
.menu {
  position: fixed;
  z-index: 1000;
  transition: .5s ease;
  animation: aparecer .8s ease;
}
@keyframes aparecer {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.wrappersubheader{
  background: var(--primary-color);
  color: white;
}
.subheader{
  display: flex;
  justify-content: space-between;
  width: min(90%, 1000px);
  margin-inline: auto;
}
.rigthSubheader{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.rigthSubheader a{
  color: azure;
  font-size: .8rem;
  transition: .5s ease;
}
.rigthSubheader a:hover{
  font-weight: 500;
  letter-spacing: 1px;
}
.logo{
  line-height: normal;
  cursor: pointer;
  user-select: none;
}
.navbar ul li {
  display: inline;
}
header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min(80%, 1000px);
  margin-inline: auto;
  height: min(10%, 10vh);
  padding: 2rem 0;
}
.navbar a{
  position: relative;
  display: inline-block;
  margin-left: 1.5rem;
  padding: 0;
  transition: .6s ease;
  font-weight: 500;
  color: white;
}
.navbar a::after{
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: .5rem;
  background: white;
  border-radius: 5px;
  transform: scaleX(0);
  transition: transform .5s;
}
.navbar a:hover::after{
  transform: scaleX(1);
}
.subheader h6{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .3rem;
}
.img_flag{
  height: .9rem;
}
.btn_group{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search{
  display: flex;
  transition: 1s ease;
  transform: scaleY(0);
}
.search.activeSearch{
  transform: scaleY(1);
}
@media (max-width:500px) {
  .gov{
    display: none;
  }
}
@media (max-width:740px) {
  .navbar{
    display: none;
  }
}
</style>
