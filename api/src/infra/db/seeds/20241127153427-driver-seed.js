'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const driverData = [
      {
        id: 1,
        name: 'Homer Simpson',
        description: `Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).`,
        car: 'Plymouth Valiant 1973 rosa e enferrujado',
        rating: '2/5',
        comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        rate_per_km: 2.50,
        min_km: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Dominic Toretto',
        description: `Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.`,
        car: 'Dodge Charger R/T 1970 modificado',
        rating: '4/5',
        comment: `Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!`,
        rate_per_km: 5.00,
        min_km: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'James Bond',
        description: `Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.`,
        car: 'Aston Martin DB5 clássico',
        rating: '5/5',
        comment: `Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.`,
        rate_per_km: 10.00,
        min_km: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const driver of driverData) {
      const existingDriver = await queryInterface.rawSelect(
        'driver',
        { where: { id: driver.id } },
        ['id']
      )

      if (existingDriver) {
        await queryInterface.bulkUpdate('driver', driver, { id: driver.id })
      } else {
        await queryInterface.bulkInsert('driver', [driver])
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('driver', null, {})
  }
}
