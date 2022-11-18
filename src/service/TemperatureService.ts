import { Temperature, TemperatureCondition } from "../utils/interfaces";

class TemperatureService {
    private decimal = 4;

    convertCelciusToFahrenheit(temperature: number) {
        return (temperature * 9 / 5) + 32;
    }

    convertFahrenheitToCelcius(temperature: number) {
        return Number(((temperature - 32) * 5 / 9).toFixed(this.decimal));
    }

    /**
     * Get current temperature condition based on current temperature
     * @param temperature current temperature
     * @param type the type of temperature
     * @returns string
     */
    temperatureCondition(temperature: number, type: Temperature) {
        const inCelcius = type === Temperature.FAHRENHEIT ? this.convertFahrenheitToCelcius(temperature) : temperature;
        if (inCelcius <= 10) {
            return TemperatureCondition.VERY_COLD;
        } else if (inCelcius <= 20) {
            return TemperatureCondition.COLD;
        } else if (inCelcius <= 30) {
            return TemperatureCondition.WARM;
        } else if (inCelcius <= 35) {
            return TemperatureCondition.HOT;
        } else if (inCelcius <= 40) {
            return TemperatureCondition.VERY_HOT;
        } else if (inCelcius <= 50) {
            return TemperatureCondition.YOUR_PC_BURNT;
        } else {
            return TemperatureCondition.NO_IDEA;
        }
    }
}

export default new TemperatureService();