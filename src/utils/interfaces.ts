export type IdentifiedObject = Record<string, string | undefined>;

export enum Temperature {
    CELCIUS = 'CELCIUS',
    FAHRENHEIT = 'FAHRENHEIT'
}

export enum TemperatureCondition {
    VERY_COLD = 'VERY_COLD',
    COLD = 'COLD',
    WARM = 'WARM',
    HOT = 'HOT',
    VERY_HOT = 'VERY_HOT',
    YOUR_PC_BURNT = 'YOUR_PC_BURNT',
    NO_IDEA = 'NO_IDEA'
}