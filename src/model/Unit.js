class Unit{
    constructor(data, user, unitId, userId) {
        this.unitId = unitId
        this.userId = userId
        this.price = data.price
        this.description = data.description
        this.numRooms = data.rooms_num
        this.address = data.house_number + " " + data.street + ", " + data.city
        this.max_rent_time = data.max_rent_time
        this.min_rent_time = data.min_rent_time
        this.phone = data.phone
        this.user = new User(userId, user)
    }
}
