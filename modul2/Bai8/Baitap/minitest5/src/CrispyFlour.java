import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class CrispyFlour extends Material implements Discount{
    private int quantity;

    public CrispyFlour(String id, String name, LocalDate manufacturingDate, int cost, int quantity) {
        super(id, name, manufacturingDate, cost);
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public double getAmount() {
        return quantity*getCost();
    }

    @Override
    public LocalDate getExpiryDate() {
        return getManufacturingDate().plusYears(1);
    }

    @Override
    public double getRealMoney() {
        LocalDate today = LocalDate.now();
        LocalDate expiryDate = getExpiryDate();
        long monthsToExpire = ChronoUnit.MONTHS.between(today, expiryDate);
        if(monthsToExpire <= 2){
            return getAmount()*0.6;
        } else if (monthsToExpire <= 4) {
            return getAmount()*0.8;
        }
        return getAmount();
    }

    @Override
    public String toString() {
        return "CrispyFlour " + super.toString() +
                " quantity= " + getQuantity() ;
    }
}
