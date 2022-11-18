import { Temperature, TemperatureCondition } from "../utils/interfaces";
import TemperatureService from "./TemperatureService";

describe('TemperatureService', () => {
    describe('convertCelciusToFahrenheit()', () => {
        it('10', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(10))
                .toEqual(50);
        });

        it('-10', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(-10))
                .toEqual(14);
        });

        it('0', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(0))
                .toEqual(32);
        });

        it('2.5', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(2.5))
                .toEqual(36.5);
        });

        it('-2.5', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(-2.5))
                .toEqual(27.5);
        });

        it('-2.56666', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(-2.56666))
                .toEqual(27.380012);
        });

        it('-100.15351513', async () => {
            expect(TemperatureService.convertCelciusToFahrenheit(-100.15351513))
                .toEqual(-148.276327234);
        });
    });

    describe('convertFahrenheitToCelcius()', () => {
        it('10', async () => {
            expect(TemperatureService.convertFahrenheitToCelcius(10))
                .toEqual(-12.2222);
        });

        it('-10', async () => {
            expect(TemperatureService.convertFahrenheitToCelcius(-10))
                .toEqual(-23.3333);
        });

        it('0', async () => {
            expect(TemperatureService.convertFahrenheitToCelcius(0))
                .toEqual(-17.7778);
        });

        it('2.5', async () => {
            expect(TemperatureService.convertFahrenheitToCelcius(2.5))
                .toEqual(-16.3889);
        });

        it('-2.5', async () => {
            expect(TemperatureService.convertFahrenheitToCelcius(-2.5))
                .toEqual(-19.1667);
        });

        it('-2.56666', async () => {
            expect(TemperatureService.convertFahrenheitToCelcius(-2.56666))
                .toEqual(-19.2037);
        });
    });

    describe('temperatureCondition()', () => {
        it('should return very cold', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(10, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(9, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(8, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(0, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(-10, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(-100, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_COLD);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(50, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(48, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(46, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(32, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(20, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_COLD);
            expect(TemperatureService.temperatureCondition(-100, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_COLD);
        });

        it('should return cold', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(20, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(19, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(18, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(11, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(12, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(13, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.COLD);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(68, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(62, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(60, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(51.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(52, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.COLD);
            expect(TemperatureService.temperatureCondition(54, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.COLD);
        });

        it('should return warm', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(30, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(29, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(28, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(21, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(22, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.WARM);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(86, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(84, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(82, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(69.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.WARM);
            expect(TemperatureService.temperatureCondition(70, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.WARM);
        });

        it('should return hot', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(35, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.HOT);
            expect(TemperatureService.temperatureCondition(31, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.HOT);
            expect(TemperatureService.temperatureCondition(32, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.HOT);
            expect(TemperatureService.temperatureCondition(33, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.HOT);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(95, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.HOT);
            expect(TemperatureService.temperatureCondition(87.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.HOT);
            expect(TemperatureService.temperatureCondition(89.6, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.HOT);
            expect(TemperatureService.temperatureCondition(91.4, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.HOT);
        });

        it('should return very hot', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(40, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_HOT);
            expect(TemperatureService.temperatureCondition(36, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_HOT);
            expect(TemperatureService.temperatureCondition(37, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_HOT);
            expect(TemperatureService.temperatureCondition(39, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.VERY_HOT);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(104, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_HOT);
            expect(TemperatureService.temperatureCondition(96.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_HOT);
            expect(TemperatureService.temperatureCondition(98.6, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_HOT);
            expect(TemperatureService.temperatureCondition(102.2, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.VERY_HOT);
        });

        it('should return your pc burnt', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(50, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(42, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(41, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(43, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(46, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(122, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(107.6, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(105.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(109.4, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
            expect(TemperatureService.temperatureCondition(114.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.YOUR_PC_BURNT);
        });

        it('should return no idea', async () => {
            // Celcius
            expect(TemperatureService.temperatureCondition(51, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(100, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(99, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(1000, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(52.5, Temperature.CELCIUS))
                .toEqual(TemperatureCondition.NO_IDEA);

            // Fahrenheit
            expect(TemperatureService.temperatureCondition(123.8, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(212, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(210.2, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(1832, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.NO_IDEA);
            expect(TemperatureService.temperatureCondition(126.5, Temperature.FAHRENHEIT))
                .toEqual(TemperatureCondition.NO_IDEA);
        });
    });
});