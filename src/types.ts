export type FormInputsProps =
    {
        animal: string;
        zoo: string;
        amount: string;
    }

export type TransactionProps =
    {
        animal: string;
        zoo: string;
        amount: number;
        date: string;
    }

export type TransactionHistoryTableProps =
    {
        transactions: TransactionProps[];
        showNoHistoryMessage: boolean;
    }

export type DonationFormProps =
    {
        isProcessing: boolean;
    }