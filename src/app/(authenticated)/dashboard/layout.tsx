
export default function Layout({ dashboardCards, transactions, recentSales }: { dashboardCards: React.ReactNode, transactions: React.ReactNode, recentSales: React.ReactNode }) {
  return (
    <div className="flex-grow md:overflow-y-auto">
      {dashboardCards}
      <div className="grid px-4 md:px-8 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {transactions}
        {recentSales}
      </div>
    </div>
  );
}  