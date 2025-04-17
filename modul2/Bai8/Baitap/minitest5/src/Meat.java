import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Meat extends Material implements Discount{
    private double weight;

    public Meat(String id, String name, LocalDate manufacturingDate, int cost, double weight) {
        super(id, name, manufacturingDate, cost);
        this.weight = weight;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    @Override
    public double getAmount() {
        return weight*getCost();
    }

    @Override
    public LocalDate getExpiryDate() {
        return getManufacturingDate().plusDays(7);
    }

    @Override
    public double getRealMoney() {
        LocalDate today = LocalDate.now();
        LocalDate expiryDate = getExpiryDate();
        long dayToExpiry = ChronoUnit.DAYS.between(today, expiryDate);
        if(dayToExpiry <= 5)
            return getAmount() * 7;
        return getAmount() * 0.9;
    }

    @Override
    public String toString() {
        return "Meat " + super.toString() +
                " weight= " + getWeight() ;
    }
}
