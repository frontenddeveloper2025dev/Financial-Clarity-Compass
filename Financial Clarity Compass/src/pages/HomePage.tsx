import { DollarSign, TrendingUp, Target, PiggyBank, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';
import { NavBar } from '@/components/NavBar';
import { useToast } from '@/hooks/use-toast';

function HomePage() {
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is currently in development`,
    });
  };

  // Mock data for demonstration
  const monthlyIncome = 5200;
  const monthlyExpenses = 3800;
  const savings = monthlyIncome - monthlyExpenses;
  const savingsGoal = 2000;
  const savingsProgress = (savings / savingsGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || 'Financial Explorer'}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your financial overview for this month
          </p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Monthly Income */}
          <Card className="finance-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="amount-large status-positive">${monthlyIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          {/* Monthly Expenses */}
          <Card className="finance-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="amount-large status-negative">${monthlyExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                -5% from last month
              </p>
            </CardContent>
          </Card>

          {/* Net Savings */}
          <Card className="finance-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              <PiggyBank className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="amount-large status-positive">${savings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((savings / monthlyIncome) * 100).toFixed(1)}% of income
              </p>
            </CardContent>
          </Card>

          {/* Savings Goal */}
          <Card className="finance-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="amount-large">${savingsGoal.toLocaleString()}</div>
              <div className="mt-2">
                <div className="progress-background h-2">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {savingsProgress.toFixed(0)}% achieved
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="finance-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your finances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-emerald-600 hover:bg-emerald-700" 
                onClick={() => handleComingSoon('Add Income')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Income
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleComingSoon('Add Expense')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleComingSoon('Set Goal')}
              >
                <Target className="mr-2 h-4 w-4" />
                Set Savings Goal
              </Button>
            </CardContent>
          </Card>

          {/* Spending Breakdown Placeholder */}
          <Card className="finance-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Spending Breakdown</CardTitle>
              <CardDescription>Where your money goes</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Chart visualization coming soon</p>
                <Button 
                  variant="link" 
                  onClick={() => handleComingSoon('Charts')}
                  className="mt-2"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Tips */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Smart Financial Tips
            </CardTitle>
            <CardDescription>Personalized advice based on your spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                  Great Savings Rate! 💰
                </h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  You're saving {((savings / monthlyIncome) * 100).toFixed(1)}% of your income. Keep it up!
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Budget Optimization 📊
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Consider tracking categories to find more saving opportunities.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  Emergency Fund 🛡️
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Build an emergency fund covering 3-6 months of expenses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default HomePage 