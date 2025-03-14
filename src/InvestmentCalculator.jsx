import { useState } from "react";

const InvestmentCalculator = () => {
    const [startingInvestment, setStartingInvestment] = useState(5000);
    const [monthlyInvestment, setMonthlyInvestment] = useState(2000);
    const [annualRate, setAnnualRate] = useState(10);
    const [retirementTarget, setRetirementTarget] = useState(200000);
    const [result, setResult] = useState(null);
    const yearsArray = [2, 5, 8, 10, 15, 20, 25];

    const calculateMonthsToReachGoal = (start, monthly, annualRate, target) => {
        let balance = start;
        let months = 0;
        let monthlyRate = annualRate / 100 / 12;

        while (balance < target) {
            balance += monthly;
            balance *= 1 + monthlyRate;
            months++;
        }

        return months;
    };

    const calculateFutureValue = (start, monthly, annualRate, n) => {
        let monthlyRate = annualRate / 100 / 12;
        return start * Math.pow(1 + monthlyRate, n) +
            monthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
    };

    const handleCalculate = () => {
        let monthsToGoal = calculateMonthsToReachGoal(startingInvestment, monthlyInvestment, annualRate, retirementTarget);
        let years = Math.floor(monthsToGoal / 12);
        let remainingMonths = monthsToGoal % 12;

        setResult({ years, remainingMonths });
    };

    return (
        <div className="bg-black-100 min-h-screen flex items-center justify-center">
            <div className="p-6 max-w-lg w-full bg-gray-300 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Investment Calculator</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Starting Investment (€)</label>
                        <input type="number" value={startingInvestment} onChange={e => setStartingInvestment(Number(e.target.value))}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Monthly Investment (€)</label>
                        <input type="number" value={monthlyInvestment} onChange={e => setMonthlyInvestment(Number(e.target.value))}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Annual Rate (%)</label>
                        <input type="number" value={annualRate} onChange={e => setAnnualRate(Number(e.target.value))}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Retirement Target (€)</label>
                        <input type="number" value={retirementTarget} onChange={e => setRetirementTarget(Number(e.target.value))}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300" />
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-600 transition">
                        Calculate
                    </button>
                </div>

                {result && (
                    <p className="mt-6 text-lg text-center text-green-600 font-semibold">
                        You will reach your retirement goal in {result.years} years and {result.remainingMonths} months.
                    </p>
                )}

                <h2 className="text-lg font-semibold mt-8 text-gray-700">Future Projections:</h2>
                <div className="overflow-x-auto">
                    <table className="w-full mt-4 border-collapse border border-gray-300 shadow-md">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-2">Years</th>
                                <th className="border p-2">Future Value (€)</th>
                                <th className="border p-2">Total Invested (€)</th>
                                <th className="border p-2">Growth (€)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yearsArray.map(year => {
                                let n = year * 12;
                                let futureValue = calculateFutureValue(startingInvestment, monthlyInvestment, annualRate, n);
                                let totalInvested = startingInvestment + (monthlyInvestment * n);
                                let growth = futureValue - totalInvested;
                                return (
                                    <tr key={year} className="text-center bg-gray-50 hover:bg-gray-100">
                                        <td className="border p-2">{year}</td>
                                        <td className="border p-2">{futureValue.toFixed(2)}</td>
                                        <td className="border p-2">{totalInvested.toFixed(2)}</td>
                                        <td className="border p-2">{growth.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InvestmentCalculator;
