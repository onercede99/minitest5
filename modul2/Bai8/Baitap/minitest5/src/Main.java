import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Main manager = new Main();

        Material newFlour = new CrispyFlour("CF06", "F4", LocalDate.of(2025, 3, 1), 11, 130);
        manager.addMaterial(newFlour);

        Material updatedFlour = new CrispyFlour("CF01", "F3 Updated", LocalDate.of(2025, 10, 1), 15, 110);
        manager.updateMaterial("CF01", updatedFlour);

        manager.deleteMaterial("M3");

        manager.displayMaterials();

        double discountDifference = manager.calculateTotalAmount() - manager.calculateTotalRealMoney();
        System.out.println("total discount difference: " + discountDifference);

    }
    private Material[] materials;
    private int size;
    private static final int MAX_SIZE = 20;

    public Main() {
        materials = new Material[MAX_SIZE];
        size = 0;

        materials[size++] = new CrispyFlour("CF01", "F3", LocalDate.of(2025,6,12),55,100);
        materials[size++] = new CrispyFlour("CF02", "ST1", LocalDate.of(2026,3,16),10,90);
        materials[size++] = new CrispyFlour("CF03", "FF101", LocalDate.of(2025,8,17),35,150);
        materials[size++] = new CrispyFlour("CF04", "FD6", LocalDate.of(2026,1,2),45,300);
        materials[size++] = new CrispyFlour("CF05", "FTN8", LocalDate.of(2025,4,23),12,80);

        materials[size++] = new Meat("M1","pork", LocalDate.of(2025,4,21),200,1300);
        materials[size++] = new Meat("M2","beef", LocalDate.of(2025,4,22),250,1300);
        materials[size++] = new Meat("M3","pork", LocalDate.of(2024,4,15),200,345);
        materials[size++] = new Meat("M4","fish", LocalDate.of(2025,4,22),160,1200);
        materials[size++] = new Meat("M5","chicken", LocalDate.of(2025,4,28),120,2300);
    }
    public void displayMaterials() {
        System.out.println("List of Materials:");
        for (Material material : materials) {
            if (material == null) break;
            System.out.println(material);
            if (material instanceof Discount) {
                System.out.println("Real Money: " + ((Discount) material).getRealMoney());
            }
            System.out.println();
        }
    }
    public void addMaterial(Material material) {
        if (size < MAX_SIZE) {
            materials[size++] = material;
            System.out.println(material);
        }else {
            System.out.println("cannot add material Array is full");
        }
        if (material instanceof Discount) {
            System.out.println("Real Money: " + ((Discount) material).getRealMoney());
        }
        System.out.println();
    }

    public void updateMaterial(String id, Material newMaterial) {
        for (int i = 0; i < size; i++) {
            if (materials[i].getId().equals(id)) {
                materials[i] = newMaterial;
                System.out.println("Updated: " + newMaterial);
                if (materials[i] instanceof Discount) {
                    System.out.println("Real Money: " + ((Discount) materials[i]).getRealMoney());
                }
                System.out.println();
                return;
            }

        }
        System.out.println("Material with ID " + id + " not found.");
    }
    public void deleteMaterial(String id) {
        for (int i = 0; i < size; i++) {
            if (materials[i].getId().equals(id)) {
                for (int j = i; j < size - 1; j++) {
                    materials[j] = materials[j + 1];
                }
                materials[size - 1] = null;
                size--;
                System.out.println("Deleted material with ID " + id);
                return;
            }
        }
        System.out.println("Material with ID " + id + " not found.");
        System.out.println();
    }
    public double calculateTotalAmount() {
        double total = 0;
        for (int i = 0; i < size; i++) {
            if (materials[i] != null) {
                total += materials[i].getAmount();
            }
        }
        return total;
    }
    public double calculateTotalRealMoney() {
        double total = 0;
        for (int i = 0; i < size; i++) {
            if (materials[i] != null) {
                if (materials[i] instanceof Discount) {
                    Discount discount = (Discount) materials[i];
                    total += discount.getRealMoney();
                }else {
                    total += materials[i].getAmount();
                }
            }
        }
        return total;
    }
}