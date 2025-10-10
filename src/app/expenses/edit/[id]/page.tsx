import EditExpensePage from '@/features/expenses/pages/EditExpensePage/EditExpensePage';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditExpensePageRoute({ params }: Props) {
  const { id } = await params;
  return <EditExpensePage expenseId={id} />;
}
