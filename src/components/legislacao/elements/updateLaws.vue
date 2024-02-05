<template>
     <section>
        <div class="container">
            <v-card
                class="mx-auto"
            >
                <v-toolbar color="cyan-lighten-1">

                    <v-toolbar-title>Atualizações recente na legislação</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn variant="text" icon="mdi-magnify"></v-btn>
                </v-toolbar>

                <v-list
                    :items="items"
                    item-props
                    lines="four"
                >
                <template v-slot:prepend>
                        <v-icon color="grey">mdi-text-box</v-icon>
        
                </template>
                    <template v-slot:subtitle="{ subtitle }">
                        <div v-html="subtitle"></div>
                    </template>
                </v-list>
            </v-card>
        </div>
    </section>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { type: 'subheader', title: 'esta semana' },
        {
          prependAvatar: 'mdi-alpha-a-box',
          title: 'lorem ypsulom?',
          subtitle: `<span class="text-primary">Lei 10/2030</span> &mdash; Lorem ipsum dolor sit amet. Eos obcaecati molestias eum sunt nostrum sed quia veritatis est internos fugiat hic inventore quia non omnis necessitatibus aut quisquam quasi. Aut officiis porro quo autem dolor qui quibusdam inventore qui nesciunt fugit. Ut nostrum error et corporis asperiores est voluptatum esse ex impedit alias et magnam porro 33 quos omnis.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'mdi-alpha-a-box',
          title: 'lorem ypsulom',
          subtitle: `<span class="text-primary">Portaria 1010/2024</span> &mdash; Lorem ipsum dolor sit amet. Eos obcaecati molestias eum sunt nostrum sed quia veritatis est internos fugiat hic inventore quia non omnis necessitatibus aut quisquam quasi. Aut officiis porro quo autem dolor qui quibusdam inventore qui nesciunt fugit. Ut nostrum error et corporis asperiores est voluptatum esse ex impedit alias et magnam porro 33 quos omnis..`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'mdi-alpha-a-box',
          title: 'lorem ypsulom',
          subtitle: '<span class="text-primary">Medida Provisória</span> &mdash; Lorem ipsum dolor sit amet. Eos obcaecati molestias eum sunt nostrum sed quia veritatis est internos fugiat hic inventore quia non omnis necessitatibus aut quisquam quasi. Aut officiis porro quo autem dolor qui quibusdam inventore qui nesciunt fugit. Ut nostrum error et corporis asperiores est voluptatum esse ex impedit alias et magnam porro 33 quos omnis.',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'mdi-alpha-a-box',
          title: 'lorem ypsulom',
          subtitle: '<span class="text-primary">Portaria</span> &mdash; Lorem ipsum dolor sit amet. Eos obcaecati molestias eum sunt nostrum sed quia veritatis est internos fugiat hic inventore quia non omnis necessitatibus aut quisquam quasi. Aut officiis porro quo autem dolor qui quibusdam inventore qui nesciunt fugit. Ut nostrum error et corporis asperiores est voluptatum esse ex impedit alias et magnam porro 33 quos omnis.',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'mdi-alpha-a-box',
          title: 'lorem ypsulom',
          subtitle: 'Jan 20, 2014',
          subtitle: '<span class="text-primary">REsolução</span> &mdash; Lorem ipsum dolor sit amet. Eos obcaecati molestias eum sunt nostrum sed quia veritatis est internos fugiat hic inventore quia non omnis necessitatibus aut quisquam quasi. Aut officiis porro quo autem dolor qui quibusdam inventore qui nesciunt fugit. Ut nostrum error et corporis asperiores est voluptatum esse ex impedit alias et magnam porro 33 quos omnis.',
        },
      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>