SCHEMAS

User
{
	firstName: String,
	lastName: String,
	username: String,
	picture: String
	drivingExpInYears: Number,
	address: String,
	email: String,
	phoneNumber: String,
	cars: [Car]
	receivedReviews: [Review],
	userRating: Number,
	isDeleted: Boolean
}

Car
{
	brand: String,
	model: String,
	year: Date,
	picture: String,
	registrationNumber: String
	hp: Number,
	fuelType: String,
	fuelConsumption: String
	seats: Number,
	distancePassed: Number,
	shortInfo: String,
	price: {
		perDay: Number,
		perHour: Number,
		perWeek: Number
	}
	availability:{
		startDate: Date,
		endDate: Date
	},
	usageRequirements: {
		leastAge: Number,
		drivingExpirience: Number,
		smokingAllowed: Boolean,
		animalsAllowed: Boolean,
		minimumRentalPeriod: String
	},
	equipment: {
		aircondition: Boolean,
		GPS: Boolean,
		winterTiers: Boolean,
		mp3Player: Boolean,
		electricWindows: Boolean
	},
	history: {
		startDate: Date,
		endDate: Date,
		renterUserName: String,
		renterUserId: ObjectId
		givenRating: Number
	},
	isDeleted: Boolean
}

Review
{
	content: String,
	date: Date,
	fromUsername: String,
	fromUserId: ObjectId,
	isDeleted: Boolean
}

PredifinedCarsToChooseFrom{[
	brand: String,
	models: [{
		model: String,
		pictureUrl: String
	}]
]}

SAMPLE MONGODB
user{
	firstName: "Pesho",
	lastName: "Peshev",
	username: "peshkata",
	picture: "someUrl"
	drivingExpInYears: 10,
	address: "bul. Levski 12, Sofia, Bulgaria",
	email: "pesho@gmail.com",
	phoneNumber: "0988123321,
	cars: [
	{
		brand: Ford,
		model: Focus,
		year: 2013,
		picture: "someUrl",
		registrationNumber: "CA1232E"
		hp: 121,
		fuelType: "Diesel",
		fuelConsumption: "6l/100km"
		seats: 5,
		distancePassed: 54000,
		shortInfo: "someShortInfo",
		price: {
			perDay: 40,
			perHour: 5,
			perWeek: 200
		}
		availability:{
			startDate: 23/11/2016,
			endDate: 31/12/2016
		},
		usageRequirements: {
			leastAge: 25,
			drivingExpirience: 5,
			smokingAllowed: false,
			animalsAllowed: true,
			minimumRentalPeriod: "1 day"
		},
		equipment: {
			aircondition: true,
			GPS: false,
			winterTiers: true,
			mp3Player: true,
			electricWindows: true
		},
		history: {
			startDate: 01/01/2015,
			endDate: 03/01/2015
			renterUserName: "goshkata",
			renterUserId: "qwdasdk1232131dsamkle21"
			givenRating: 4
		},
		isDeleted: false
	}],
	receivedReviews: [{
		date, 
		content,
		fromUsername,
		fromUserId
	}]
	userRate: 4.5,
	isDeleted: false	
}

PredifinedCarsToChooseFrom{[
	brand: Ford,
	model: Focus,
	picture: "someUrl"
]}