abstract class Employee {
    protected int id;
    protected String name;
    protected int age;
    protected String phoneNumber;
    protected String emailAddress;

    public abstract double getSalary();

    public Employee(){
    }

    public Employee(int id, String name, int age, String phoneNumber, String emailAddress) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Override
    public String toString() {
        return "NhanVien" +
                ", id=" + id +
                ", name= " + name  +
                ", age= " + age +
                ", phoneNumber= " + phoneNumber +
                ", emailAddress= " + emailAddress + ' ' ;
    }
}
