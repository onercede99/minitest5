package service;

import model.Employee;
import model.Department;
import model.Position;
import exception.EmployeeNotFoundException;
import util.FileUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class EmployeeService {
    private static final String EMPLOYEE_FILE = "resources/employees.dat";
    private ConcurrentHashMap<String, Employee> employees = new ConcurrentHashMap<>();
    private AtomicInteger idCounter = new AtomicInteger(1);

    public EmployeeService() {
        loadEmployees();
    }

    public synchronized void addEmployee(Employee employee) {
        String id = "EMP" + String.format("%04d", idCounter.getAndIncrement());
        employee.setId(id);
        employees.put(id, employee);
        saveEmployees();
    }

    public Employee getEmployee(String id) throws EmployeeNotFoundException {
        Employee emp = employees.get(id);
        if (emp == null) {
            throw new EmployeeNotFoundException("Không tìm thấy nhân viên với ID: " + id);
        }
        return emp;
    }

    public synchronized void updateEmployee(Employee employee) {
        if (!employees.containsKey(employee.getId())) {
            throw new EmployeeNotFoundException("Không tìm thấy nhân viên để cập nhật");
        }
        employees.put(employee.getId(), employee);
        saveEmployees();
    }

    public synchronized void deleteEmployee(String id) {
        if (!employees.containsKey(id)) {
            throw new EmployeeNotFoundException("Không tìm thấy nhân viên để xóa");
        }
        employees.remove(id);
        saveEmployees();
    }

    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employees.values());
    }

    public List<Employee> searchEmployees(String keyword) {
        List<Employee> result = new ArrayList<>();
        String lowerKeyword = keyword.toLowerCase();

        for (Employee emp : employees.values()) {
            if (emp.getName().toLowerCase().contains(lowerKeyword) ||
                    emp.getEmail().toLowerCase().contains(lowerKeyword) ||
                    emp.getId().toLowerCase().contains(lowerKeyword)) {
                result.add(emp);
            }
        }
        return result;
    }

    private void loadEmployees() {
        Object data = FileUtil.readObjectFromFile(EMPLOYEE_FILE);
        if (data instanceof ConcurrentHashMap) {
            employees = (ConcurrentHashMap<String, Employee>) data;
            // Cập nhật bộ đếm ID
            int maxId = employees.keySet().stream()
                    .mapToInt(k -> Integer.parseInt(k.substring(3)))
                    .max()
                    .orElse(0);
            idCounter.set(maxId + 1);
        }
    }

    private void saveEmployees() {
        FileUtil.writeObjectToFile(EMPLOYEE_FILE, employees);
    }
}
